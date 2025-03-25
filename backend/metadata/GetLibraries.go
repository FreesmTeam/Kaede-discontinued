package metadata

import (
    "encoding/json"
    "net/http"
    "time"
    "io/ioutil"
)

type Library struct {
    Downloads struct {
        Artifact struct {
            Path string `json:"path"`
        } `json:"artifact"`
    } `json:"downloads"`
}

type LibrariesData struct {
    Libraries []Library `json:"libraries"`
}

func GetLibraries(url string) LibrariesData {
    apiClient := http.Client{
        Timeout: time.Second * 5,
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

    var librariesData LibrariesData
	jsonErr := json.Unmarshal(body, &librariesData)

    if jsonErr != nil {
        println("Error:", jsonErr.Error())
    }

    return librariesData
}