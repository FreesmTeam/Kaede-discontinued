import React from "react";
import { sidebarButtons } from "../../../configs/sidebar";

export default function Sidebar() {
    return (
        <div className="sticky w-24 top-0 px-4 pb-2">
            <div className="fixed flex flex-col gap-4 items-center justify-between w-16 h-full max-h-[calc(100vh-48px)] rounded-full bg-[#e0def4] py-2">
                <div className="flex flex-col gap-4 items-center">
                    {
                        sidebarButtons.map((button) => {
                            if (button.default) {
                                return (
                                    <button
                                        key={button.name}
                                        className="cursor-pointer overflow-clip flex rounded-full bg-[#eb6f92] w-12 min-h-12 text-white justify-center items-center hover:bg-[#e74b77] transition"
                                    >
                                        {button.icon}
                                    </button>
                                );
                            }

                            return (
                                <button
                                    key={button.name}
                                    className="cursor-pointer overflow-clip flex rounded-full w-12 min-h-12 text-zinc-600 justify-center items-center hover:bg-[#d9c9ee] hover:text-zinc-800 transition"
                                >
                                    {button.icon}
                                </button>
                            );
                        })
                    }
                </div>
                <button
                    className="cursor-pointer overflow-clip flex rounded-full w-12 min-h-12 text-zinc-600 justify-center items-center hover:grayscale transition"
                >
                    <img
                        className="w-12 h-12"
                        src="https://zen-auth.vercel.app/favicon.ico"
                        alt={"user's avatar"}
                    />
                </button>
            </div>
        </div>
    );
}