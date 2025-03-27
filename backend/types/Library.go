package types

type Library struct {
	Downloads struct {
		Artifact struct {
			Path string `json:"path"`
		} `json:"artifact"`
	} `json:"downloads"`
}
