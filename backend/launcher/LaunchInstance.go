package launcher

import (
    "os/exec"
)

func LaunchInstance(
    minecraftVersion string,
    minecraftDirectory string,
) {
    var javaBinary string = "java"

	args := BuildArgs(minecraftDirectory, minecraftVersion)
	err := exec.Command(javaBinary, args...).Start()

	if err != nil {
		println("Error:", err.Error())
	}
}