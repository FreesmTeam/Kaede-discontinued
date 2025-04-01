package launcher

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"regexp"
	"strings"

	api "kaede/backend/api"
	data "kaede/backend/data"
	types "kaede/backend/types"
	utils "kaede/backend/utils"
)

func CreateInstance(version string) {
	instanceDir := filepath.Join(data.HomeDirectory, "instances", "vanilla", version)
	kaedeDir := filepath.Join(instanceDir, "kaede")
	libsDir := filepath.Join(kaedeDir, "libs")
	nativesDir := filepath.Join(kaedeDir, "natives")
	assetsDir := filepath.Join(kaedeDir, "assets")

	fmt.Printf("Creating instance for version %s at %s\n", version, instanceDir)

	fmt.Println("Creating directories...")
	if err := os.MkdirAll(filepath.Join(assetsDir, "indexes"), 0755); err != nil {
		fmt.Printf("failed to create indexes dir: %v\n", err)

	}
	if err := os.MkdirAll(libsDir, 0755); err != nil {
		fmt.Printf("failed to create libs dir: %v\n", err)
	}
	if err := os.MkdirAll(nativesDir, 0755); err != nil {
		fmt.Printf("failed to create natives dir: %v\n", err)

	}

	fmt.Println("Downloading version manifest...")
	manifestBody, err := api.GetManifest(version)
	if err != nil {
		fmt.Printf("failed to get manifest %s (%v)\n", version, err)

	}
	if len(manifestBody) == 0 {
		fmt.Println("manifest is empty (maybe API error?)")

	}

	manifestPath := filepath.Join(kaedeDir, "version_manifest.json")
	if err := os.WriteFile(manifestPath, manifestBody, 0644); err != nil {
		fmt.Printf("failed to write manifest: %v\n", err)

	}

	var manifest types.VersionManifest
	if err := json.Unmarshal(manifestBody, &manifest); err != nil {
		fmt.Printf("failed to parse manifest: %v\n", err)

	}

	fmt.Printf("Loaded manifest for Minecraft %s\n", manifest.ID)

	fmt.Println("Downloading libraries...")
	if err := downloadLibs(libsDir, nativesDir, manifest.Libraries); err != nil {
		fmt.Printf("failed to download libs: %v\n", err)

	}

	fmt.Println("Downloading assets...")
	if err := downloadAssets(assetsDir, manifest); err != nil {
		fmt.Printf("failed to download assets: %v\n", err)

	}

	fmt.Println("Downloading client...")
	clientPath := filepath.Join(instanceDir, "client.jar")
	if err := downloadFile(manifest.Downloads.Client.URL, clientPath, 0644); err != nil {
		fmt.Printf("failed to download client: %v\n", err)

	}

	fmt.Println("Instance created successfully!")

}

func downloadLibs(libsPath, nativesPath string, libraries []types.Library) error {
	for _, lib := range libraries {
		if !isLibraryAllowed(lib) {
			continue
		}

		var artifact types.Artifact
		var destPath string
		var isNative bool

		if lib.Downloads.Artifact.URL != "" {
			artifact = lib.Downloads.Artifact
			destPath = filepath.Join(libsPath, artifact.Path)
		}

		if lib.Downloads.Classifiers != nil {
			osName := utils.GetOSName()
			for _, classifier := range lib.Downloads.Classifiers {
				if strings.Contains(classifier.Path, osName) {
					artifact = classifier
					destPath = filepath.Join(nativesPath, filepath.Base(artifact.Path))
					isNative = true
					break
				}
			}
		}

		if artifact.URL == "" {
			fmt.Printf("Skipping library (no URL): %s\n", lib.Name)
			continue
		}

		if _, err := os.Stat(destPath); err == nil {
			fmt.Printf("Already exists: %s\n", lib.Name)
			continue
		}

		if err := os.MkdirAll(filepath.Dir(destPath), 0755); err != nil {
			return fmt.Errorf("failed to create library directory: %w", err)
		}

		if err := downloadFile(artifact.URL, destPath, 0644); err != nil {
			return fmt.Errorf("failed to download library %s: %w", lib.Name, err)
		}

		if isNative {
			fmt.Printf("Downloaded native: %s\n", filepath.Base(destPath))
		} else {
			fmt.Printf("Downloaded library: %s\n", lib.Name)
		}
	}
	return nil
}

func isLibraryAllowed(lib types.Library) bool {
	if len(lib.Rules) == 0 {
		return true
	}

	currentOS := utils.GetOSName()
	allowed := false

	for _, rule := range lib.Rules {
		osMatches := rule.Os.Name == "" || rule.Os.Name == currentOS

		if !osMatches {
			continue
		}

		if rule.Os.Version != "" {
			matched, err := regexp.MatchString(rule.Os.Version, utils.GetOSVersion())
			if err != nil || !matched {
				continue
			}
		}

		if rule.Action == "disallow" {
			return false
		}
		allowed = true
	}

	return allowed
}

func downloadAssets(assetsDir string, manifest types.VersionManifest) error {
	indexBody, err := api.Fetch(manifest.AssetIndex.URL)
	if err != nil {
		return fmt.Errorf("failed to fetch %s (%w)", manifest.AssetIndex.URL, err)
	}
	indexPath := filepath.Join(assetsDir, "indexes", manifest.ID+".json")
	if err := os.WriteFile(indexPath, indexBody, 0644); err != nil {
		return fmt.Errorf("failed to write assets index: %w", err)
	}

	var index types.AssetsIndex
	if err := json.Unmarshal(indexBody, &index); err != nil {
		return fmt.Errorf("failed to parse assets index: %w", err)
	}

	for hash := range index.Objects {
		assetPath := filepath.Join(assetsDir, "objects", hash[:2], hash)
		if err := os.MkdirAll(filepath.Dir(assetPath), 0755); err != nil {
			return fmt.Errorf("failed to create asset directory: %w", err)
		}

		url := fmt.Sprintf("https://resources.download.minecraft.net/%s/%s", hash[:2], hash)
		if err := downloadFile(url, assetPath, 0644); err != nil {
			return fmt.Errorf("failed to download asset %s: %w", hash, err)
		}
	}
	return nil
}

func downloadFile(url, destPath string, perm os.FileMode) error {
	body, err := api.Fetch(url)
	if err != nil {
		return fmt.Errorf("failed to fetch %s (%w)", url, err)
	}

	if err := os.WriteFile(destPath, body, perm); err != nil {
		return fmt.Errorf("failed to write file %s: %w", destPath, err)
	}
	return nil
}
