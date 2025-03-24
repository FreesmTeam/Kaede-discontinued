import React, { useState } from 'react';
import { Close as windowClose, Minimise as windowMinimise, ToggleMaximise as windowToggleMaximise } from "../../../../wailsjs/go/main/App";
import {ArrowLeft, ArrowRight, ChevronsLeftRight, ChevronsRightLeft, Minus, X} from 'lucide-react';

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

    function redirectBack() {
        window.history.back();
    }

    function redirectForward() {
        window.history.forward();
    }
    
    return (
        <div className="flex flex-nowrap justify-between items-center gap-2 w-full h-8 bg-[#101013]">
            <div className="w-24 h-full flex flex-nowrap gap-0">
                <button
                    onClick={redirectBack}
                    className="__global-no-drag group flex justify-center items-center transition cursor-pointer w-8"
                >
                    <div
                        className="flex justify-center items-center transition rounded-full text-white w-6 h-6 bg-[#202026] group-hover:bg-[#303039]"
                    >
                        <ArrowLeft size={16} />
                    </div>
                </button>
                <button
                    onClick={redirectForward}
                    className="__global-no-drag group flex justify-center items-center transition cursor-pointer w-8"
                >
                    <div
                        className="flex justify-center items-center transition rounded-full text-white w-6 h-6 bg-[#202026] group-hover:bg-[#303039]"
                    >
                        <ArrowRight size={16} />
                    </div>
                </button>
            </div>
            <div
                className="select-none px-2 flex flex-nowrap justify-start gap-2 items-center w-fit">
                <div className="font-semibold text-nowrap text-sm text-white">
                    Freesm <span className="text-[#eb6f92]">Reloaded</span>
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