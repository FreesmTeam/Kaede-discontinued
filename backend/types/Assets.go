package types

type AssetsIndex struct {
	Objects map[string]Asset `json:"objects"`
}

type Asset struct {
	Hash string `json:"hash"`
	Size int    `json:"size"`
}
