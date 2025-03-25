import React from "react";
import { sidebarButtons } from "../../../configs/sidebar";
import { Link, useLocation } from "react-router-dom";
import { pageRoutes } from "../../../configs/pages";

export default function Sidebar() {
    const pathname = useLocation().pathname;

    return (
        <div className="w-fit bg-[#101013f3] rounded-bl-md">
            <div className="flex flex-col gap-4 items-center justify-between w-16 h-full max-h-[calc(100vh-32px)] py-2">
                <div className="flex flex-col gap-4 items-center">
                    {
                        sidebarButtons.map((button) => {
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
                <Link
                    to={pageRoutes.account}
                    className="cursor-pointer overflow-clip flex rounded-full w-12 min-h-12 text-zinc-600 justify-center items-center hover:grayscale transition"
                >
                    <img
                        className="w-12 h-12"
                        src="https://zen-auth.vercel.app/favicon.ico"
                        alt={"user's avatar"}
                    />
                </Link>
            </div>
        </div>
    );
}