package launcher

import (
    //"os/exec"
)

// Function Export
func LaunchInstance() {
    //var javaBinary string = "java"

	args := BuildArgs("F:\\llauncher\\Minecraft\\game", "1.16.5")
	println(args)
	/*err := exec.Command(javaBinary, args...).Start()

	if err != nil {
		println("Error:", err.Error())
	}*/
}