import React, { useEffect, useState } from "react";
import { useThrottle } from "@uidotdev/usehooks";
import { useThemeStore } from "@/utils/Stores/ThemeStore";
import { ThemeStoreType } from "@/types/Stores/ThemeStore.type";

export default function ThemeOpacityCustomizer() {
    const { theme, setTheme } = useThemeStore((state: ThemeStoreType) => state);
    const [opacity, setOpacity] = useState({
        ...theme.opacity,
    });
    const debouncedOpacity = useThrottle(opacity, 200);

    useEffect(() => {
        setTheme({
            colorScheme: theme.colorScheme,
            opacity: {
                outside: debouncedOpacity.outside,
                inside: debouncedOpacity.inside,
            },
        });
    }, [debouncedOpacity]);

    return (
        <>
            <div className="flex">
                <input
                    type="range"
                    defaultValue={Number(
                        theme.opacity.outside,
                    ) * 100}
                    onChange={(event) => {
                        event.preventDefault();

                        const opacityValue = Math.floor(
                            Number(event.currentTarget.value),
                        ) / 100;

                        setOpacity((prev) => {
                            return {
                                inside: prev.inside,
                                outside: opacityValue.toString(),
                            };
                        });
                    }}
                />
                {opacity.outside}
            </div>
            <div className="flex">
                <input
                    type="range"
                    defaultValue={Number(
                        theme.opacity.inside,
                    ) * 100}
                    onChange={(event) => {
                        event.preventDefault();

                        const opacityValue = Math.floor(
                            Number(event.currentTarget.value),
                        ) / 100;

                        setOpacity((prev) => {
                            return {
                                inside: opacityValue.toString(),
                                outside: prev.outside,
                            };
                        });
                    }}
                />
                {opacity.inside}
            </div>
        </>
    );
}