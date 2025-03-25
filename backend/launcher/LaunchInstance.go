package launcher

import (
    "os/exec"
)

func LaunchInstance() {
    var javaBinary string = "java"

	args := BuildArgs("F:\\llauncher\\Minecraft\\game")
	err := exec.Command(javaBinary, args...).Start()

	if err != nil {
		println("Error:", err.Error())
	}
}