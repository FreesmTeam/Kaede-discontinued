package launcher

import (
    "os/exec"
)

func LaunchInstance(minecraftVersion string) {
    var javaBinary string = "java"

	args := BuildArgs("E:\\llauncher\\Minecraft\\game", minecraftVersion)
	err := exec.Command(javaBinary, args...).Start()

	if err != nil {
		println("Error:", err.Error())
	}
}