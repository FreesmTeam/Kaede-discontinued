package launcher

import (
	"fmt"
	"io"
	"net/http"
	"time"

	data "kaede/backend/data"
	utils "kaede/backend/utils"
)

func Fetch(url string) ([]byte, error) {
	client := &http.Client{
		Timeout: 30 * time.Second,
	}

	resp, err := client.Get(url)
	if err != nil {
		return nil, fmt.Errorf("HTTP request failed: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("unexpected status code: %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read response: %w", err)
	}

	return body, nil
}

func GetManifest(version string) ([]byte, error) {
	versionData := utils.FindVersion(data.VersionsManifest, version)

	if versionData == nil {
		fmt.Println("IERR: Failed to find version in VersionManifest")
		return nil, fmt.Errorf("Failed to find version in VersionManifest")
	}

	body, err := Fetch(versionData.URL)

	if err != nil {
		fmt.Printf("Failed to fetch manifest (%s)", err)
		return nil, err
	}

	return body, nil
}
