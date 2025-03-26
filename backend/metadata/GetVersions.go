package metadata

import (
	"encoding/json"
	"io"
	"net/http"
	"time"
)

type Version struct {
	ID  string `json:"id"`
	URL string `json:"url"`
}

type VersionsData struct {
	Versions []Version `json:"versions"`
}

func GetVersions() VersionsData {
	var url string = "https://launchermeta.mojang.com/mc/game/version_manifest.json"

	apiClient := http.Client{
		Timeout: time.Second * 15,
	}

	req, err := http.NewRequest(http.MethodGet, url, nil)

	if err != nil {
		println("Error:", err.Error())
	}

	req.Header.Set("User-Agent", "kaede")

	res, getErr := apiClient.Do(req)

	if getErr != nil {
		println("Error:", getErr.Error())
	}

	if res.Body != nil {
		defer res.Body.Close()
	}

	body, readErr := io.ReadAll(res.Body)

	if readErr != nil {
		println("Error:", readErr.Error())
	}

	var versionsData VersionsData
	jsonErr := json.Unmarshal(body, &versionsData)

	if jsonErr != nil {
		println("Error:", jsonErr.Error())
	}

	return versionsData
}
