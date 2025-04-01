package launcher

import (
	"encoding/json"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"strings"

	"github.com/google/uuid"

	constants "kaede/backend/constants"
	data "kaede/backend/data"
	types "kaede/backend/types"
)

func LaunchInstance(version string) error {
	instanceDir := filepath.Join(data.HomeDirectory, "instances", "vanilla", version)
	manifestPath := filepath.Join(instanceDir, "kaede", "version_manifest.json")

	body, err := os.ReadFile(manifestPath)
	if err != nil {
		return fmt.Errorf("failed to read version_manifest.json: %w", err)
	}

	var manifest types.VersionManifest
	if err := json.Unmarshal(body, &manifest); err != nil {
		return fmt.Errorf("failed to decode version_manifest.json: %w", err)
	}

	var libPaths []string
	for _, lib := range manifest.Libraries {
		libPaths = append(libPaths, filepath.Join(instanceDir, "kaede", "libs", lib.Downloads.Artifact.Path))
	}

	classPath := strings.Join(append(libPaths, filepath.Join(instanceDir, "client.jar")), ":")

	replacements := map[string]string{
		"${auth_player_name}":  "kaede",
		"${version_name}":      manifest.ID,
		"${game_directory}":    instanceDir,
		"${assets_root}":       filepath.Join(instanceDir, "kaede", "assets"),
		"${assets_index_name}": manifest.ID,
		"${auth_uuid}":         uuid.NewString(),
		"${auth_access_token}": "",
		"${user_type}":         "offline",
		"${version_type}":      "release",
		"${launcher_name}":     constants.ApplicationName,
		"${version_version}":   constants.ApplicationVersion,
		"${natives_directory}": filepath.Join(instanceDir, "kaede", "natives"),
	}

	var args []string
	args = append(args, "-cp", classPath)

	if manifest.MinecraftArguments != "" {
		legacyArgs := replacePlaceholders(manifest.MinecraftArguments, replacements)
		args = append(args, manifest.MainClass)
		args = append(args, legacyArgs)
	} else {
		jvmArgs := processArgs(manifest.Arguments.Jvm, replacements)
		gameArgs := processArgs(manifest.Arguments.Game, replacements)

		args = append(args, jvmArgs...)
		args = append(args, manifest.MainClass)
		args = append(args, gameArgs...)
	}

	args = append(args,
		"-Dminecraft.api.env=custom",
		"-Dminecraft.api.auth.host=https://kaede.kaede",
		"-Dminecraft.api.account.host=https://kaede.kaede",
		"-Dminecraft.api.session.host=https://kaede.kaede",
		"-Dminecraft.api.services.host=https://kaede.kaede",
	)

	cmd := exec.Command("java", args...)
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	fmt.Println("### STARTING MINECRAFT")
	if err := cmd.Run(); err != nil {
		return fmt.Errorf("failed to run minecraft: %w", err)
	}
	fmt.Println("### MINECRAFT EXITED")

	return nil
}

func processArgs(rawArgs []interface{}, replacements map[string]string) []string {
	var args []string
	for _, arg := range extractArgs(rawArgs) {
		args = append(args, replacePlaceholders(arg, replacements))
	}
	return args
}

func replacePlaceholders(s string, replacements map[string]string) string {
	for k, v := range replacements {
		s = strings.ReplaceAll(s, k, v)
	}
	return s
}

func extractArgs(args []interface{}) []string {
	var result []string
	for _, arg := range args {
		if s, ok := arg.(string); ok {
			result = append(result, s)
			continue
		}

		if m, ok := arg.(map[string]interface{}); ok {
			if values, ok := m["value"].([]interface{}); ok {
				result = appendVal(result, values)
			}
		}
	}
	return result
}

func appendVal(result []string, values []interface{}) []string {
	for _, val := range values {
		if s, ok := val.(string); ok {
			result = append(result, s)
		}
	}
	return result
}
