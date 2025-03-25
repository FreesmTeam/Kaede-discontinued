package launcher

import (
    "path/filepath"

    metadata "myproject/backend/metadata"
)

func BuildArgs(minecraftDirectory string, minecraftVersion string) []string {
    var librariesPath = filepath.Join(minecraftDirectory, "libraries")

    var versionsData = metadata.GetVersions()
    var foundVersionLibrariesURL = metadata.FindVersion(versionsData, minecraftVersion)
    var librariesData = metadata.GetLibraries(foundVersionLibrariesURL)
    var formattedLibraryNames = metadata.FormatLibraryNames(librariesData, librariesPath)
    var libraries = formattedLibraryNames + filepath.Join(minecraftDirectory, "versions", minecraftVersion, minecraftVersion + ".jar")

	var libraryNativesPath string = "-Djava.library.path=C:\\Users\\windstone\\AppData\\Roaming\\versions\\1.16.5\\natives"
	var multiplayerWorkaround = []string{
		"-Dminecraft.api.env=custom",
		"-Dminecraft.api.auth.host=https://invalid.invalid",
		"-Dminecraft.api.account.host=https://invalid.invalid",
		"-Dminecraft.api.session.host=https://invalid.invalid",
		"-Dminecraft.api.services.host=https://invalid.invalid",
	}
    var launcherBranding = []string{
        "-Dminecraft.launcher.brand=custom-launcher",
        "-Dminecraft.launcher.version=2.1",
    }
    var classPaths = []string{
        "-cp",
        libraries,
        "net.minecraft.client.main.Main",
    }
    var userData = []string{
        "--username",
        "notwindstone",
        "--version",
        minecraftVersion,
        "--gameDir",
        minecraftDirectory,
        "--assetsDir",
        filepath.Join(minecraftDirectory, "assets"),
        "--assetIndex",
        "1.16",
        "--uuid",
        "f81d4fae-7dec-11d0-a765-00a0c91e6bf6",
        "--accessToken",
        "broisinsane",
        "--userType",
        "offline",
        "--versionType",
        "release",
    }

	args := append([]string{}, libraryNativesPath)
	args = append(args, multiplayerWorkaround...)
	args = append(args, launcherBranding...)
	args = append(args, classPaths...)
	args = append(args, userData...)

	return args
}
