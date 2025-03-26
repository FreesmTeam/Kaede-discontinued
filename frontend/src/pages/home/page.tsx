import React, { useState } from "react";
import { LaunchMinecraft, GetAvailableVersions } from "../../../wailsjs/go/main/App";
import ThemeOpacityCustomizer from "../../components/UI/Theme/ThemeOpacityCustomizer/ThemeOpacityCustomizer";

export default function HomePage() {
    const [launched, setLaunched] = useState(false);
    const [info, setInfo] = useState<string | null>(null);

    function launchMinecraft() {
        LaunchMinecraft("1.16.5", "E:\\llauncher\\Minecraft\\game").then((response: {
            Code:    number;
            Message: string;
        }) => {
            setLaunched((prev) => !prev);
            setInfo(response.Message);
        });
    }

    function getAvailableVersions() {
        GetAvailableVersions("E:\\llauncher\\Minecraft\\game\\versions").then((response) => {
            console.log(response);
        });
    }

    return (
        <div>
            <div className="text-white">welcome home</div>
            <img
                alt="Kita oshi no ko dance gif"
                src="https://media.tenor.com/XF0W80UFt-0AAAAj/kita-chan-kitaikuyo.gif"
            />
            <button
                className="bg-rose-500 py-2 px-4 rounded-md mt-4 active:bg-rose-700 transition"
                onClick={getAvailableVersions}
            >
                GET VERSIONS
            </button>
            <button
                className="bg-rose-500 py-2 px-4 rounded-md mt-4 active:bg-rose-700 transition"
                onClick={launchMinecraft}
            >
                LAUNCH
            </button>
            {
                launched && (
                    <div className="text-sm text-zinc-300">
                        ~ {info}
                    </div>
                )
            }
            <ThemeOpacityCustomizer />
        </div>
    );
}
