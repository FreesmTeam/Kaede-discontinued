import React, { useState } from "react";
import { LaunchMinecraft, DownloadMinecraft, GetAvailableVersions } from "@/../wailsjs/go/main/App";
import ThemeOpacityCustomizer from "@/components/UI/Theme/ThemeOpacityCustomizer/ThemeOpacityCustomizer";
import KitaDance from "@/assets/media/kita-chan-kitaikuyo.webp";
import MinecraftLogs from "@/components/UI/MinecraftLogs/MinecraftLogs";

export default function HomePage() {
    const [availableVersions, setAvailableVersions] = useState<Array<string>>();
    const [info, setInfo] = useState<string>();
    const [selectedVersion, setSelectedVersion] = useState<string>();

    function launchMinecraft() {
        if (!selectedVersion) {
            return;
        }

        LaunchMinecraft(selectedVersion).then((response: {
            Code:    number;
            Message: string;
        }) => {
            setInfo(response.Message);
        });
    }
    function downloadMinecraft() {
        if (!selectedVersion) {
            return;
        }

        DownloadMinecraft(selectedVersion).then(() => {
            setInfo("Downloaded minecraft");
        });
    }

    function getAvailableVersions() {
        GetAvailableVersions().then((response) => {
            setAvailableVersions(response);
        });
    }

    console.log('rendered');
    return (
        <div>
            <>
                <div className="text-white">welcome home</div>
                <img
                    alt="Kita oshi no ko dance gif"
                    src={KitaDance}
                />
                <MinecraftLogs />
                <button
                    className="bg-rose-500 py-2 px-4 rounded-md mt-4 active:bg-rose-700 transition"
                    onClick={getAvailableVersions}
                >
                    GET LOCAL VERSIONS
                </button>
                {
                    availableVersions && (
                        <div className="flex flex-col w-fit">
                            Selected: {selectedVersion ?? "none"}
                            <select
                                value={selectedVersion ?? ""}
                                onChange={(event) => {
                                    setSelectedVersion(event.target.value);
                                }}
                            >
                                <option
                                    className="text-black"
                                    value={"null"}
                                >
                                    Ничего не выбрано
                                </option>
                                {
                                    availableVersions.map((version) => {
                                        if (
                                            version.includes("w")
                                            || version.includes("rc")
                                            || version.toLowerCase().includes("pre")
                                        ) {
                                            return;
                                        }

                                        return (
                                            <option
                                                className="text-black"
                                                key={version}
                                                value={version}
                                            >
                                                Vanilla {version}
                                            </option>
                                        );
                                    })
                                }
                            </select>
                            <button
                                className="bg-rose-500 py-2 px-4 rounded-md mt-4 active:bg-rose-700 transition"
                                onClick={downloadMinecraft}
                            >
                                DOWNLOAD
                            </button>
                            <button
                                className="bg-rose-500 py-2 px-4 rounded-md mt-4 active:bg-rose-700 transition"
                                onClick={launchMinecraft}
                            >
                                LAUNCH
                            </button>
                        </div>
                    )
                }
                <div className="text-sm text-zinc-300">
                    ~ {info}
                </div>
                <ThemeOpacityCustomizer/>
                {
                    availableVersions?.map((version) => {
                        return (
                            <div key={version}>
                                {version}
                            </div>
                        );
                    })
                }
            </>
        </div>
    );
}
