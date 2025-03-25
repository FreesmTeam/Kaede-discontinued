package main

import (
	"context"
	"fmt"

	launcher "myproject/backend/launcher"
	runtime "github.com/wailsapp/wails/v2/pkg/runtime"
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
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("fmt.Sprintf said that %s", name)
}

func (a *App) LaunchMinecraft(path string) Result {
    // implement library rules check
    // so that only supported libraries will be used in launch args
    go launcher.LaunchInstance()

	return Result{0, fmt.Sprintf("Launched minecraft %s", path)}
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
