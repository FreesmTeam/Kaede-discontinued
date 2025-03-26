import React from 'react';
import Sidebar from "@/components/UI/Sidebar/Sidebar";
import { HashRouter } from "react-router-dom";
import DefinedRoutes from "@/components/Logic/DefinedRoutes";
import { useThemeStore } from "@/utils/Stores/ThemeStore";
import { ThemeStoreType } from "@/types/Stores/ThemeStore.type";

function App() {
    const theme = useThemeStore((state: ThemeStoreType) => state.theme);

    return (
        <HashRouter basename={"/"}>
            <div id="App" className="text-white flex h-[calc(100vh-32px)]">
                <Sidebar/>
                <div
                    className="flex overflow-clip rounded-br-md w-full">
                    <div
                        className="transition ease-out duration-300 relative border-t-[1px] border-l-[1px] border-[#303030] w-full overflow-auto [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#eb6f92]"
                        style={{
                            backgroundColor: `rgba(25, 25, 29, ${theme.opacity.inside})`,
                        }}
                    >
                        <DefinedRoutes />
                    </div>
                </div>
            </div>
        </HashRouter>
    );
}

export default App;
