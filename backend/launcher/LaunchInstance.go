package launcher

import (
    "os/exec"
)

func LaunchInstance(
    minecraftVersion string,
    minecraftDirectory string,
) {
    var javaBinary string = "java"

    println("~Minecraft launch process:", "starting building launch args")

	args := BuildArgs(minecraftDirectory, minecraftVersion)

    println("~Minecraft launch process:", "executing launch...")

	err := exec.Command(javaBinary, args...).Start()

	if err != nil {
		println("Error:", err.Error())
	}
}