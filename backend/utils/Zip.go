package utils

import (
	"archive/zip"
	"bytes"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"strings"
)

func Unzip(data []byte, targetPath string) error {
	reader := bytes.NewReader(data)

	zipReader, err := zip.NewReader(reader, int64(len(data)))
	if err != nil {
		return fmt.Errorf("failed to create zip reader: %v", err)
	}

	for _, f := range zipReader.File {
		filePath := filepath.Join(targetPath, f.Name)

		if !strings.HasPrefix(filePath, filepath.Clean(targetPath)+string(os.PathSeparator)) {
			return fmt.Errorf("invalid file path: %s", filePath)
		}

		if f.FileInfo().Name() == "META-INF" {
			continue
		}

		if f.FileInfo().IsDir() {
			if err := os.MkdirAll(filePath, 0755); err != nil {
				return fmt.Errorf("failed to create directory: %v", err)
			}
			continue
		}

		if err := os.MkdirAll(filepath.Dir(filePath), 0755); err != nil {
			return fmt.Errorf("failed to create parent directory: %v", err)
		}

		writeFile(f, filePath)

	}
	return nil
}

func writeFile(f *zip.File, filePath string) error {
	rc, err := f.Open()
	if err != nil {
		return fmt.Errorf("failed to open file in archive: %v", err)
	}
	defer rc.Close()

	file, err := os.OpenFile(filePath, os.O_WRONLY|os.O_CREATE|os.O_TRUNC, f.Mode())
	if err != nil {
		return fmt.Errorf("failed to create file: %v", err)
	}
	defer file.Close()

	if _, err := io.Copy(file, rc); err != nil {
		return fmt.Errorf("failed to copy file contents: %v", err)
	}

	return nil
}
