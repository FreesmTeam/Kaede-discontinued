package metadata

import (
	"path/filepath"
)

func FormatLibraryNames(libraries LibrariesData, path string) string {
	var librariesAsPath string = ""
	var separator string = ";"

	for index := range libraries.Libraries {
		var libraryPath string = libraries.Libraries[index].Downloads.Artifact.Path
		var absolutePath string = filepath.Join(path, libraryPath)

		librariesAsPath = librariesAsPath + absolutePath + separator
	}

	return librariesAsPath
}
