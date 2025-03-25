package launcher

import (
    "path/filepath"
    "fmt"

    metadata "myproject/backend/metadata"
)

type Version struct {
    ID string `json:"id"`
}

type Data struct {
    Versions []Version `json:"versions"`
}

// Function Export
func BuildArgs(minecraftDirectory string, minecraftVersion string) []string {
    var libraries = "F:\\llauncher\\Minecraft\\game\\libraries\\com\\mojang\\patchy\\1.3.9\\patchy-1.3.9.jar;F:\\llauncher\\Minecraft\\game\\libraries\\oshi-project\\oshi-core\\1.1\\oshi-core-1.1.jar;F:\\llauncher\\Minecraft\\game\\libraries\\net\\java\\dev\\jna\\jna\\4.4.0\\jna-4.4.0.jar;F:\\llauncher\\Minecraft\\game\\libraries\\net\\java\\dev\\jna\\platform\\3.4.0\\platform-3.4.0.jar;F:\\llauncher\\Minecraft\\game\\libraries\\com\\ibm\\icu\\icu4j\\66.1\\icu4j-66.1.jar;F:\\llauncher\\Minecraft\\game\\libraries\\com\\mojang\\javabridge\\1.0.22\\javabridge-1.0.22.jar;F:\\llauncher\\Minecraft\\game\\libraries\\net\\sf\\jopt-simple\\jopt-simple\\5.0.3\\jopt-simple-5.0.3.jar;F:\\llauncher\\Minecraft\\game\\libraries\\io\\netty\\netty-all\\4.1.25.Final\\netty-all-4.1.25.Final.jar;F:\\llauncher\\Minecraft\\game\\libraries\\com\\google\\guava\\guava\\21.0\\guava-21.0.jar;F:\\llauncher\\Minecraft\\game\\libraries\\org\\apache\\commons\\commons-lang3\\3.5\\commons-lang3-3.5.jar;F:\\llauncher\\Minecraft\\game\\libraries\\commons-io\\commons-io\\2.5\\commons-io-2.5.jar;F:\\llauncher\\Minecraft\\game\\libraries\\commons-codec\\commons-codec\\1.10\\commons-codec-1.10.jar;F:\\llauncher\\Minecraft\\game\\libraries\\net\\java\\jinput\\jinput\\2.0.5\\jinput-2.0.5.jar;F:\\llauncher\\Minecraft\\game\\libraries\\net\\java\\jutils\\jutils\\1.0.0\\jutils-1.0.0.jar;F:\\llauncher\\Minecraft\\game\\libraries\\com\\mojang\\brigadier\\1.0.17\\brigadier-1.0.17.jar;F:\\llauncher\\Minecraft\\game\\libraries\\com\\mojang\\datafixerupper\\4.0.26\\datafixerupper-4.0.26.jar;F:\\llauncher\\Minecraft\\game\\libraries\\com\\google\\code\\gson\\gson\\2.8.0\\gson-2.8.0.jar;F:\\llauncher\\Minecraft\\game\\libraries\\com\\mojang\\authlib\\2.1.28\\authlib-2.1.28.jar;F:\\llauncher\\Minecraft\\game\\libraries\\org\\apache\\commons\\commons-compress\\1.8.1\\commons-compress-1.8.1.jar;F:\\llauncher\\Minecraft\\game\\libraries\\org\\apache\\httpcomponents\\httpclient\\4.3.3\\httpclient-4.3.3.jar;F:\\llauncher\\Minecraft\\game\\libraries\\commons-logging\\commons-logging\\1.1.3\\commons-logging-1.1.3.jar;F:\\llauncher\\Minecraft\\game\\libraries\\org\\apache\\httpcomponents\\httpcore\\4.3.2\\httpcore-4.3.2.jar;F:\\llauncher\\Minecraft\\game\\libraries\\it\\unimi\\dsi\\fastutil\\8.2.1\\fastutil-8.2.1.jar;F:\\llauncher\\Minecraft\\game\\libraries\\org\\apache\\logging\\log4j\\log4j-api\\2.8.1\\log4j-api-2.8.1.jar;F:\\llauncher\\Minecraft\\game\\libraries\\org\\apache\\logging\\log4j\\log4j-core\\2.8.1\\log4j-core-2.8.1.jar;F:\\llauncher\\Minecraft\\game\\libraries\\org\\lwjgl\\lwjgl\\3.2.2\\lwjgl-3.2.2.jar;F:\\llauncher\\Minecraft\\game\\libraries\\org\\lwjgl\\lwjgl-jemalloc\\3.2.2\\lwjgl-jemalloc-3.2.2.jar;F:\\llauncher\\Minecraft\\game\\libraries\\org\\lwjgl\\lwjgl-openal\\3.2.2\\lwjgl-openal-3.2.2.jar;F:\\llauncher\\Minecraft\\game\\libraries\\org\\lwjgl\\lwjgl-opengl\\3.2.2\\lwjgl-opengl-3.2.2.jar;F:\\llauncher\\Minecraft\\game\\libraries\\org\\lwjgl\\lwjgl-glfw\\3.2.2\\lwjgl-glfw-3.2.2.jar;F:\\llauncher\\Minecraft\\game\\libraries\\org\\lwjgl\\lwjgl-stb\\3.2.2\\lwjgl-stb-3.2.2.jar;F:\\llauncher\\Minecraft\\game\\libraries\\org\\lwjgl\\lwjgl-tinyfd\\3.2.2\\lwjgl-tinyfd-3.2.2.jar;F:\\llauncher\\Minecraft\\game\\libraries\\org\\lwjgl\\lwjgl\\3.2.2\\lwjgl-3.2.2-natives-windows.jar;F:\\llauncher\\Minecraft\\game\\libraries\\org\\lwjgl\\lwjgl-jemalloc\\3.2.2\\lwjgl-jemalloc-3.2.2-natives-windows.jar;F:\\llauncher\\Minecraft\\game\\libraries\\org\\lwjgl\\lwjgl-openal\\3.2.2\\lwjgl-openal-3.2.2-natives-windows.jar;F:\\llauncher\\Minecraft\\game\\libraries\\org\\lwjgl\\lwjgl-opengl\\3.2.2\\lwjgl-opengl-3.2.2-natives-windows.jar;F:\\llauncher\\Minecraft\\game\\libraries\\org\\lwjgl\\lwjgl-glfw\\3.2.2\\lwjgl-glfw-3.2.2-natives-windows.jar;F:\\llauncher\\Minecraft\\game\\libraries\\org\\lwjgl\\lwjgl-tinyfd\\3.2.2\\lwjgl-tinyfd-3.2.2-natives-windows.jar;F:\\llauncher\\Minecraft\\game\\libraries\\org\\lwjgl\\lwjgl-stb\\3.2.2\\lwjgl-stb-3.2.2-natives-windows.jar;F:\\llauncher\\Minecraft\\game\\libraries\\com\\mojang\\text2speech\\1.11.3\\text2speech-1.11.3.jar;F:\\llauncher\\Minecraft\\game\\libraries\\com\\mojang\\text2speech\\1.11.3\\text2speech-1.11.3-natives-windows.jar;F:\\llauncher\\Minecraft\\game\\versions\\1.16.5\\1.16.5.jar"

    var versions = metadata.GetVersions()
    fmt.Printf("%#v", versions)

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
