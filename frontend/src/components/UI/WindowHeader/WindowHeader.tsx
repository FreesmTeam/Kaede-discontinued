import React, { useState } from 'react';
import { Close as windowClose, Minimise as windowMinimise, ToggleMaximise as windowToggleMaximise } from "../../../../wailsjs/go/main/App";
import { ArrowLeft, ArrowRight, ChevronsLeftRight, ChevronsRightLeft, Minus, X } from 'lucide-react';
import { currentVersion } from "../../../configs/build";
import { useThemeStore } from "../../../utils/Stores/ThemeStore";
import { ThemeStoreType } from "../../../types/Stores/ThemeStore.type";

export default function WindowHeader() {
    const theme = useThemeStore((state: ThemeStoreType) => state.theme);
    const [maximised, setMaximised] = useState<boolean | null>(null);

    function close() {
        windowClose().then();
    }

    function minimise() {
        windowMinimise().then();
    }

    function maximise() {
        windowToggleMaximise().then((isMaximised: boolean) => {
            setMaximised(isMaximised);
        });
    }

    function redirectBack() {
        window.history.back();
    }

    function redirectForward() {
        window.history.forward();
    }
    
    return (
        <>
            <div
                className="flex flex-nowrap justify-between items-center gap-2 w-full rounded-t-md h-8 transition ease-out duration-300"
                style={{
                    backgroundColor: `rgba(16, 16, 19, ${theme.opacity.outside})`,
                }}
            >
                <div className="w-24 h-full flex flex-nowrap gap-0">
                    <button
                        onClick={redirectBack}
                        className="__global-no-drag group flex justify-center items-center transition cursor-pointer w-8"
                    >
                        <div
                            className="flex justify-center items-center transition rounded-full text-white w-6 h-6 bg-[#242428] group-hover:bg-[#303039]"
                        >
                            <ArrowLeft size={16}/>
                        </div>
                    </button>
                    <button
                        onClick={redirectForward}
                        className="__global-no-drag group flex justify-center items-center transition cursor-pointer w-8"
                    >
                        <div
                            className="flex justify-center items-center transition rounded-full text-white w-6 h-6 bg-[#242428] group-hover:bg-[#303039]"
                        >
                            <ArrowRight size={16}/>
                        </div>
                    </button>
                </div>
                <div
                    className="select-none flex flex-nowrap justify-start gap-2 items-center w-fit">
                    <div className="font-semibold text-nowrap text-sm text-white flex items-center gap-1.5">
                        Freesm
                        <span className="text-[#eb6f92]">Reloaded</span>
                        <span className="text-xs text-zinc-500">{currentVersion}</span>
                    </div>
                </div>
                <div
                    className="flex h-full gap-0 items-stretch"
                >
                    <button
                        onClick={minimise}
                        className="__global-no-drag group flex justify-center items-center transition cursor-pointer w-8"
                    >
                        <div
                            className="flex justify-center items-center transition rounded-full text-transparent group-hover:text-[#733e01] w-4 h-4 bg-[#ebbcba]"
                        >
                            <Minus size={12}/>
                        </div>
                    </button>
                    <button
                        onClick={maximise}
                        className="__global-no-drag group flex justify-center items-center transition cursor-pointer w-8"
                    >
                        <div
                            className="flex justify-center items-center transition rounded-full text-transparent group-hover:text-[#01540d] w-4 h-4 bg-[#9ccfd8]"
                        >
                            {
                                maximised ? (
                                    <ChevronsRightLeft size={14}/>
                                ) : (
                                    <ChevronsLeftRight size={14}/>
                                )
                            }
                        </div>
                    </button>
                    <button
                        onClick={close}
                        className='__global-no-drag group flex justify-center items-center transition cursor-pointer w-8'
                    >
                        <div
                            className="flex justify-center items-center transition rounded-full text-transparent group-hover:text-[#700700] w-4 h-4 bg-[#eb6f92]"
                        >
                            <X size={12}/>
                        </div>
                    </button>
                </div>
            </div>
        </>
    );
}