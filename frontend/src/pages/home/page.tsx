import React, { useState } from "react";
import { LaunchMinecraft, GetAvailableVersions } from "@/../wailsjs/go/main/App";
import ThemeOpacityCustomizer from "@/components/UI/Theme/ThemeOpacityCustomizer/ThemeOpacityCustomizer";
import KitaDance from "@/assets/media/kita-chan-kitaikuyo.webp";

export default function HomePage() {
    const [availableVersions, setAvailableVersions] = useState<Array<string> | null>(null);
    const [launched, setLaunched] = useState(false);
    const [info, setInfo] = useState<string | null>(null);
    const [selectedVersion, setSelectedVersion] = useState<string | null>(null);

    function launchMinecraft() {
        if (!selectedVersion) {
            return;
        }

        LaunchMinecraft(selectedVersion, "E:\\llauncher\\Minecraft\\game").then((response: {
            Code:    number;
            Message: string;
        }) => {
            setLaunched((prev) => !prev);
            setInfo(response.Message);
        });
    }

    function getAvailableVersions() {
        GetAvailableVersions("E:\\llauncher\\Minecraft\\game\\versions").then((response) => {
            setAvailableVersions(response);
        });
    }

    return (
        <div>
            <div className="text-white">welcome home</div>
            <img
                alt="Kita oshi no ko dance gif"
                src={KitaDance}
            />
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
            <ThemeOpacityCustomizer />
            {
                availableVersions?.map((version) => {
                    return (
                        <div key={version}>
                            {version}
                        </div>
                    );
                })
            }
        </div>
    );
}
