import { Route, Routes } from "react-router-dom";
import { pageRoutes } from "@/configs/pages";
import React from "react";

export default function DefinedRoutes() {
    const pagesEntries = Object.entries(pageRoutes);

    return (
        <Routes>
            {
                pagesEntries.map(([key, value]) => {
                    return (
                        <Route
                            key={key}
                            path={value.path}
                            element={value.component}
                        />
                    );
                })
            }
        </Routes>
    );
}