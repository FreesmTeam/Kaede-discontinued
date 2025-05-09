package main

import (
	"context"
	"fmt"
	"os"

	runtime "github.com/wailsapp/wails/v2/pkg/runtime"

	launcher "kaede/backend/launcher"
)

type Result struct {
	Code    int
	Message string
}

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx

	go mkHomeDirectory()
}

func mkHomeDirectory() {
	path, err := launcher.HomeDirectory()

	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	}

	err1 := os.MkdirAll(path, 0755)

	if err1 != nil {
		fmt.Println(err1.Error())
		os.Exit(1)

	}
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("fmt.Sprintf said that %s", name)
}

func (a *App) GetAvailableVersions(minecraftDirectory string) []string {
	f, err := os.Open(minecraftDirectory)

	defer func() { _ = f.Close() }()

	if err != nil {
		println("Error:", err.Error())
	}

	// 10000 is here just to limit the directories amount to read
	fns, err := f.Readdirnames(10000)

	if err != nil {
		println("Error:", err.Error())
	}

	return fns
}

func (a *App) LaunchMinecraft(
	minecraftVersion string,
	minecraftDirectory string,
) Result {
	println(
		"~Minecraft launch process:",
		"\033[40m",
		"starting go routine",
		"\033[0m",
	)

	// implement library rules check
	// so that only supported libraries will be used in launch args
	go launcher.LaunchInstance(minecraftVersion, minecraftDirectory)

	return Result{0, "Launched minecraft " + minecraftVersion}
}

func (a *App) Close() {
	runtime.Quit(a.ctx)
}

func (a *App) Minimise() bool {
	runtime.WindowMinimise(a.ctx)

	return runtime.WindowIsMinimised(a.ctx)
}

func (a *App) ToggleMaximise() bool {
	runtime.WindowToggleMaximise(a.ctx)

	return runtime.WindowIsMaximised(a.ctx)
}
