import React, { useState } from 'react';
import { Close as windowClose, Minimise as windowMinimise, ToggleMaximise as windowToggleMaximise } from "../../../wailsjs/go/main/App";
import { ChevronsLeftRight, ChevronsRightLeft, Minus, X } from 'lucide-react';

export default function WindowHeader() {
    const [maximised, setMaximised] = useState<boolean | null>(null);

    function close() {
        windowClose().then();
    }

    function minimise() {
        windowMinimise().then((isMinimised: boolean) => {
            console.log(isMinimised);
        });
    }

    function maximise() {
        windowToggleMaximise().then((isMaximised: boolean) => {
            setMaximised(isMaximised);
        });
    }
    
    return (
        <div className="flex flex-nowrap justify-between items-center gap-2 w-full h-8 bg-[#393941] border-t-[1px] border-x-[1px] border-[#727176]">
            <div
                className="flex h-full gap-0 items-stretch"
            >
                <button
                    onClick={close}
                    className='__global-no-drag group flex justify-center items-center transition w-8'
                >
                    <div
                        className="flex justify-center items-center transition rounded-full text-transparent group-hover:text-[#700700] w-4 h-4 bg-[#ff5e54]"
                    >
                        <X size={12} />
                    </div>
                </button>
                <button
                    onClick={minimise}
                    className="__global-no-drag group flex justify-center items-center transition w-8"
                >
                    <div
                        className="flex justify-center items-center transition rounded-full text-transparent group-hover:text-[#733e01] w-4 h-4 bg-[#ffbd2e]"
                    >
                        <Minus size={12} />
                    </div>
                </button>
                <button
                    onClick={maximise}
                    className="__global-no-drag group flex justify-center items-center transition w-8"
                >
                    <div
                        className="flex justify-center items-center transition rounded-full text-transparent group-hover:text-[#01540d] w-4 h-4 bg-[#27c93f]"
                    >
                        {
                            maximised ? (
                                <ChevronsRightLeft size={14} />
                            ) : (
                                <ChevronsLeftRight size={14} />
                            )
                        }
                    </div>
                </button>
            </div>
            <div
                className="select-none px-2 flex flex-nowrap justify-start gap-2 items-center w-fit">
                <div className="text-nowrap text-sm text-white">
                    blud thinks hes using a macOS
                </div>
            </div>
            <div className="w-24"/>
        </div>
    );
}