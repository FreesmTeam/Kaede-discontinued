package metadata

import (
    types "kaede/backend/types"
)

func FindVersion(versions types.VersionsData, versionToFind string) string {
	for index := range versions.Versions {
		if versions.Versions[index].ID == versionToFind {
			return versions.Versions[index].URL
		}
	}

	return "nothing"
}
