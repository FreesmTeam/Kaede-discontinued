package meta

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	data "kaede/backend/data"
	types "kaede/backend/types"
)

var (
	versions types.VersionsManifest
	assets   types.AssetsIndex
)

func ParseVersions() {
	var url string = "https://launchermeta.mojang.com/mc/game/version_manifest_v2.json"

	response, err := http.Get(url)

	if err != nil {
		fmt.Printf("ERR: Failed to send request (%s)\n", err)
	}

	defer response.Body.Close()
	body, err := io.ReadAll(response.Body)

	if err != nil {
		fmt.Printf("ERR: Failed to read versions manifest body (%s)\n", err)
	}

	err = json.Unmarshal(body, &versions)

	if err != nil {
		fmt.Printf("ERR: Failed to unmarshal versions manifest (%s)\n", err)
	}

	data.VersionsManifest = versions
}
