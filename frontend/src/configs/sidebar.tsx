import { Bell, Home, Library, SettingsIcon, UserRound } from "lucide-react";
import React from "react";
import { pageRoutes } from "@/configs/pages";

export const sidebarButtons = [
    [
        {
            icon: <Home />,
            route: pageRoutes.home.path,
            name: "Главная",
        },
        {
            icon: <Library />,
            route: pageRoutes.library.path,
            name: "Библиотека",
        },
        {
            icon: <Bell />,
            route: pageRoutes.notifications.path,
            name: "Уведомления",
        },
        {
            icon: <SettingsIcon />,
            route: pageRoutes.settings.path,
            name: "Настройки",
        },
    ],
    [
        {
            icon: <UserRound />,
            route: pageRoutes.account.path,
            name: "Аккаунт",
        },
    ],
];