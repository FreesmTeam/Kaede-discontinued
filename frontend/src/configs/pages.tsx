import React from "react";
import HomePage from "@/pages/home/page";
import AccountPage from "@/pages/account/page";
import SettingsPage from "@/pages/settings/page";
import LibraryPage from "@/pages/library/page";
import NotificationsPage from "@/pages/notifications/page";

export const pageRoutes = {
    home: {
        path: "/",
        component: <HomePage />,
    },
    library: {
        path: "/library",
        component: <LibraryPage />,
    },
    notifications: {
        path: "/notifications",
        component: <NotificationsPage />,
    },
    settings: {
        path: "/settings",
        component: <SettingsPage />,
    },
    account: {
        path: "/account",
        component: <AccountPage />,
    },
};