import { Route, Routes } from "react-router-dom";
import { pageRoutes } from "../../configs/pages";
import HomePage from "../../pages/home/page";
import AccountPage from "../../pages/account/page";
import React from "react";

export default function DefinedRoutes() {
    return (
        <Routes>
            <Route
                path={pageRoutes.home}
                element={<HomePage />}
            />
            <Route
                path={pageRoutes.account}
                element={<AccountPage />}
            />
        </Routes>
    );
}