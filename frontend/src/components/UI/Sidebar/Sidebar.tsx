import React from "react";
import { sidebarButtons } from "@/configs/sidebar";
import { Link, useLocation } from "react-router-dom";
import { useThemeStore } from "@/utils/Stores/ThemeStore";
import { ThemeStoreType } from "@/types/Stores/ThemeStore.type";

export default function Sidebar() {
    const theme = useThemeStore((state: ThemeStoreType) => state.theme);
    const pathname = useLocation().pathname;

    return (
        <div
            className="w-fit rounded-bl-md transition ease-out duration-300"
            style={{
                backgroundColor: `rgba(16, 16, 19, ${theme.opacity.outside})`,
            }}
        >
            <div className="flex flex-col gap-4 items-center justify-between w-16 h-full max-h-[calc(100vh-32px)] py-2">
                {
                    sidebarButtons.map((part, index) => {
                        return (
                            <div key={index} className="flex flex-col gap-4 items-center">
                                {
                                    part.map((button) => {
                                        if (button.route === pathname) {
                                            return (
                                                <Link
                                                    key={button.name}
                                                    to={button.route}
                                                    className="cursor-pointer overflow-clip flex rounded-full bg-[#eb6f92] w-12 min-h-12 text-white justify-center items-center hover:bg-[#d93b67] transition"
                                                >
                                                    {button.icon}
                                                </Link>
                                            );
                                        }

                                        return (
                                            <Link
                                                key={button.name}
                                                to={button.route}
                                                className="cursor-pointer overflow-clip flex rounded-full w-12 min-h-12 text-white justify-center items-center hover:bg-[#303039] bg-[#202026] transition"
                                            >
                                                {button.icon}
                                            </Link>
                                        );
                                    })
                                }
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}