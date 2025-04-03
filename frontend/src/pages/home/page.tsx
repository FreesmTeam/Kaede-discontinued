import React, { useEffect, useState } from "react";
import { LaunchMinecraft, DownloadMinecraft, GetAvailableVersions } from "@/../wailsjs/go/main/App";
import ThemeOpacityCustomizer from "@/components/UI/Theme/ThemeOpacityCustomizer/ThemeOpacityCustomizer";
import KitaDance from "@/assets/media/kita-chan-kitaikuyo.webp";

export default function HomePage() {
    const [minecraftLogs, setMinecraftLogs] = useState<Array<string>>([]);
    const [availableVersions, setAvailableVersions] = useState<Array<string>>();
    const [launched, setLaunched] = useState(false);
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
            setLaunched((state) => !state);
            setInfo(response.Message);
            setMinecraftLogs([]);
        });
    }
    function downloadMinecraft() {
        if (!selectedVersion) {
            return;
        }

        DownloadMinecraft(selectedVersion);
    }

    function getAvailableVersions() {
        GetAvailableVersions().then((response) => {
            setAvailableVersions(response);
        });
    }

    useEffect(() => {
        if (globalThis === undefined || !('runtime' in globalThis)) {
            return;
        }

        // eslint-disable-next-line
        // @ts-ignore
        const runtime = globalThis.runtime;
        const cleanup = runtime.EventsOn("javaLogs", (line: string) => {
            setMinecraftLogs((previousLogs: string[]) => {
                const updatedLogs = [...previousLogs, line];

                return updatedLogs;
            });
        });

        runtime.EventsOn("javaError", (error: string) => {
            console.error("Java error:", error);
        });

        // Clean up listeners when component unmounts
        return () => {
            cleanup?.();
            runtime.EventsOff("javaLogs");
            runtime.EventsOff("javaError");
        };
    }, []);

    return (
        <div>
            <>
                <div className="text-white">welcome home</div>
                <img
                    alt="Kita oshi no ko dance gif"
                    src={KitaDance}
                />
                <div className="flex flex-col max-h-[30vh] overflow-auto">
                    {
                        minecraftLogs?.map((line: string) => {
                            return (
                                <div className="text-rose-100 text-sm" key={line}>
                                    {line}
                                </div>
                            );
                        })
                    }
                </div>
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
                {
                    launched && (
                        <div className="text-sm text-zinc-300">
                            ~ {info}
                        </div>
                    )
                }
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
