package metadata

import (
    "encoding/json"
    "net/http"
    "time"
    "io/ioutil"
)

type Version struct {
    ID string `json:"id"`
}

type Data struct {
    Versions []Version `json:"versions"`
}

// Function Export
func GetVersions() Data {
    var url string = "https://launchermeta.mojang.com/mc/game/version_manifest.json"

    apiClient := http.Client{
        Timeout: time.Second * 2,
    }

    req, err := http.NewRequest(http.MethodGet, url, nil)

	if err != nil {
		println("Error:", err.Error())
	}

    req.Header.Set("User-Agent", "freesm-reloaded")

    res, getErr := apiClient.Do(req)

    if getErr != nil {
        println("Error:", getErr.Error())
    }

    if res.Body != nil {
        defer res.Body.Close()
    }

    body, readErr := ioutil.ReadAll(res.Body)

    if readErr != nil {
        println("Error:", readErr.Error())
    }

    var versionsData Data
	jsonErr := json.Unmarshal(body, &versionsData)

    if jsonErr != nil {
        println("Error:", jsonErr.Error())
    }

    return versionsData
}