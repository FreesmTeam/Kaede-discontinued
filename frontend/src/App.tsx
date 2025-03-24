import React from 'react';
import Sidebar from "./components/UI/Sidebar/Sidebar";
import { HashRouter } from "react-router-dom";
import DefinedRoutes from "./components/Logic/DefinedRoutes";

function App() {
    return (
        <HashRouter basename={"/"}>
            <div id="App" className="text-white flex h-[calc(100vh-32px)]">
                <Sidebar/>
                <div
                    className="border-t-[1px] border-l-[1px] border-[#303030] bg-black rounded-tl-md overflow-auto w-full [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-track]:my-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#eb6f92]">
                    <DefinedRoutes />
                </div>
            </div>
        </HashRouter>
    );
}

export default App;
