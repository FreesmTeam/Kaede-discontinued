package launcher

import (
	"fmt"
	"os"
	"path/filepath"
	"runtime"

	constants "kaede/backend/constants"
	data "kaede/backend/data"
)

var (
	arch string = runtime.GOOS
	path string
)

func HomeDirectory() error {
	switch arch {
	case "linux":
		var dataHome string = os.Getenv("XDG_DATA_HOME")

		if dataHome == "" {
			dataHome = filepath.Join(os.Getenv("HOME"), ".local", "share")
		}

		data.HomeDirectory = filepath.Join(dataHome, constants.ApplicationName)
		return nil
	case "windows":
		data.HomeDirectory = filepath.Join(os.Getenv("APPDATA"), constants.ApplicationName)
	case "darwin":
		data.HomeDirectory = filepath.Join(os.Getenv("HOME"), "Library", "Application Support", constants.ApplicationName)
	default:
		return fmt.Errorf("unsupported OS: %s", arch)
	}

	return nil
}
