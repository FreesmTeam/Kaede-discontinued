package main

import (
	"embed"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"github.com/wailsapp/wails/v2/pkg/options/windows"
	"github.com/wailsapp/wails/v2/pkg/options/linux"
	"github.com/wailsapp/wails/v2/pkg/options/mac"

	constants "kaede/backend/constants"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Create an instance of the app structure
	app := NewApp()

	// Create application with options
	err := wails.Run(&options.App{
		Title:     constants.ApplicationName,
		Width:     800,
		Height:    600,
		Frameless: true,
		MinWidth:  400,
		MinHeight: 400,
		Windows: &windows.Options{
            DisablePinchZoom:                  true,
		    WebviewIsTransparent:              true,
            WindowIsTranslucent:               true,
		},
        Linux: &linux.Options{
            WindowIsTranslucent:               true,
        },
        Mac: &mac.Options{
		    WebviewIsTransparent:              true,
            WindowIsTranslucent:               true,
        },
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 0, G: 0, B: 0, A: 0},
		OnStartup:        app.startup,
		Bind: []interface{}{
			app,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
