package metadata

import (
	"encoding/json"
	"io"
	"net/http"
	"time"

	types "kaede/backend/types"

	constants "kaede/backend/constants"
)

type LibrariesData struct {
	Libraries []types.Library `json:"libraries"`
}

func GetLibraries(url string) LibrariesData {
	apiClient := http.Client{
		Timeout: time.Second * 15,
	}

	req, err := http.NewRequest(http.MethodGet, url, nil)

	if err != nil {
		println("Error:", err.Error())
	}

	req.Header.Set("User-Agent", constants.ApplicationName)

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

	var librariesData LibrariesData
	jsonErr := json.Unmarshal(body, &librariesData)

	if jsonErr != nil {
		println("Error:", jsonErr.Error())
	}

	return librariesData
}
