package utils

import types "kaede/backend/types"

func FindVersion(manifest types.VersionsManifest, targetID string) *types.Version {
	for _, version := range manifest.Versions {
		if version.ID == targetID {
			return &version
		}
	}
	return nil
}
