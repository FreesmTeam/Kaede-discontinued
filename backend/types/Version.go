package types

import "time"

type Version struct {
	ID              string    `json:"id"`
	Type            string    `json:"type"`
	URL             string    `json:"url"`
	Time            time.Time `json:"time"`
	ReleaseTime     time.Time `json:"releaseTime"`
	Sha1            string    `json:"sha1"`
	ComplianceLevel int       `json:"complianceLevel"`
}
