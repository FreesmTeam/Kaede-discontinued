import { Home , SettingsIcon } from "lucide-react";
import React from "react";
import { pageRoutes } from "@/configs/pages";

export const sidebarButtons = [
    {
        icon: <Home />,
        route: pageRoutes.home,
        name: "Главная",
    },
    {
        icon: <SettingsIcon />,
        route: pageRoutes.settings,
        name: "Настройки",
    },
];