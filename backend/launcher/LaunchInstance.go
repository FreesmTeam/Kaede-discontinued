package launcher

import (
    "os/exec"
)

func LaunchInstance(
    minecraftVersion string,
    minecraftDirectory string,
) {
    var javaBinary string = "java"

    println(
        "~Minecraft launch process:",
        "\033[40m",
        "starting building launch args",
        "\033[0m",
    )

	args := BuildArgs(minecraftDirectory, minecraftVersion)

    println(
        "~Minecraft launch process:",
        "\033[40m",
        "executing launch...",
        "\033[0m",
    )

	cmd := exec.Command(javaBinary, args...)
	stdout, err := cmd.StdoutPipe()
    cmd.Stderr = cmd.Stdout

    if err != nil {
        println("Error:", err.Error())
    }

    if err = cmd.Start(); err != nil {
        println("Error:", err.Error())
    }

    for {
        tmp := make([]byte, 1024)
        _, err := stdout.Read(tmp)

        println("\033[0;34m", string(tmp), "\033[0m")

        if err != nil {
            break
        }
    }
}