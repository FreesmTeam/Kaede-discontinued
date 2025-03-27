import { Bell, Home, Library, SettingsIcon, UserRound } from "lucide-react";
import React from "react";
import { pageRoutes } from "@/configs/pages";

export const sidebarButtons = [
    [
        {
            icon: <Home />,
            route: pageRoutes.home,
            name: "Главная",
        },
        {
            icon: <Library />,
            route: pageRoutes.library,
            name: "Библиотека",
        },
        {
            icon: <Bell />,
            route: pageRoutes.notifications,
            name: "Уведомления",
        },
        {
            icon: <SettingsIcon />,
            route: pageRoutes.settings,
            name: "Настройки",
        },
    ],
    [
        {
            icon: <UserRound />,
            route: pageRoutes.account,
            name: "Аккаунт",
        },
    ],
];