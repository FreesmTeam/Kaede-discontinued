import React, { useState } from "react";
import { LaunchMinecraft } from "../../../wailsjs/go/main/App";
import { useThemeStore } from "../../utils/Stores/ThemeStore";
import { ThemeStoreType } from "../../types/Stores/ThemeStore.type";

export default function HomePage() {
    const { theme, setTheme } = useThemeStore((state: ThemeStoreType) => state);
    const [launched, setLaunched] = useState(false);
    const [selectedFile, setSelectedFile] = useState<string>("");
    const [info, setInfo] = useState<string | null>(null);

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0].name || "";
        setSelectedFile(file);
    }

    function launchMinecraft() {
        LaunchMinecraft(selectedFile).then((response: {
            Code:    number;
            Message: string;
        }) => {
            setLaunched((prev) => !prev);
            setInfo(response.Message);
        });
    }

    return (
        <div>
            <div className="text-white">welcome home</div>
            <img
                alt="Kita oshi no ko dance gif"
                src="https://media.tenor.com/XF0W80UFt-0AAAAj/kita-chan-kitaikuyo.gif"
            />
            <input
                type="file"
                className="rounded-md bg-rose-800 px-2 py-2 m-1"
                accept=".jar"
                onChange={handleFileChange}
            />
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
            <div className="flex">
                <input
                    type="range"
                    defaultValue={theme.opacity.outside}
                    onChange={(event) => {
                        event.preventDefault();

                        const opacityValue = Math.floor(
                            Number(event.currentTarget.value),
                        ) / 100;

                        setTheme({
                            colorScheme: theme.colorScheme,
                            opacity: {
                                inside: theme.opacity.inside,
                                outside: opacityValue.toString(),
                            },
                        });
                    }}
                />
                {theme.opacity.outside}
            </div>
            <div className="flex">
                <input
                    type="range"
                    defaultValue={theme.opacity.inside}
                    onChange={(event) => {
                        event.preventDefault();

                        const opacityValue = Math.floor(
                            Number(event.currentTarget.value),
                        ) / 100;

                        setTheme({
                            colorScheme: theme.colorScheme,
                            opacity: {
                                outside: theme.opacity.outside,
                                inside: opacityValue.toString(),
                            },
                        });
                    }}
                />
                {theme.opacity.inside}
            </div>
        </div>
    );
}
