package utils

import (
	"os"
	"os/exec"
	"runtime"
	"strings"
)

func GetOSName() string {
	switch runtime.GOOS {
	case "darwin":
		return "osx"
	case "windows":
		return "windows"
	default:
		return "linux"
	}
}

func GetOSVersion() string {
	switch runtime.GOOS {
	case "darwin":
		return getMacOSVersion()
	case "windows":
		return getWindowsVersion()
	case "linux":
		return getLinuxVersion()
	default:
		return ""
	}
}

// ###### TODO: that's dirty neuro-code, REWORK WITH MORE INFO!!
func getMacOSVersion() string {
	cmd := exec.Command("sw_vers", "-productVersion")
	out, err := cmd.Output()
	if err != nil {
		return ""
	}
	return strings.TrimSpace(string(out))
}

func getWindowsVersion() string {
	cmd := exec.Command("cmd", "/c", "ver")
	out, err := cmd.Output()
	if err != nil {
		return ""
	}

	version := string(out)
	if start := strings.Index(version, "[Version "); start != -1 {
		if end := strings.Index(version[start:], "]"); end != -1 {
			return version[start+9 : start+end]
		}
	}
	return ""
}

func getLinuxVersion() string {
	data, err := os.ReadFile("/etc/os-release")
	if err == nil {
		lines := strings.Split(string(data), "\n")
		for _, line := range lines {
			if strings.HasPrefix(line, "VERSION_ID=") {
				version := strings.Trim(strings.TrimPrefix(line, "VERSION_ID="), `"`)
				return version
			}
		}
	}

	cmd := exec.Command("lsb_release", "-r", "-s")
	out, err := cmd.Output()
	if err == nil {
		return strings.TrimSpace(string(out))
	}

	return ""
}

// ###### END neuro-code
