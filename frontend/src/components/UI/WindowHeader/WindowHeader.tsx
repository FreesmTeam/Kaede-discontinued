import React, { useState } from 'react';
import { Close as windowClose, Minimise as windowMinimise, ToggleMaximise as windowToggleMaximise } from "../../../../wailsjs/go/main/App";
import { ChevronsLeftRight, ChevronsRightLeft, Minus, X } from 'lucide-react';

export default function WindowHeader() {
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
    
    return (
        <div className="flex flex-nowrap justify-between items-center gap-2 w-full h-8 bg-[#edf4ff]">
            <div className="w-24"/>
            <div
                className="select-none px-2 flex flex-nowrap justify-start gap-2 items-center w-fit">
                <div className="font-semibold text-nowrap text-sm text-zinc-800">
                    Freesm <span className="text-[#c4a7e7]">Reloaded</span>
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
    );
}