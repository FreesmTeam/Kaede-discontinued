import React from 'react';
import { Close, Minimise, ToggleMaximise } from "../../../wailsjs/go/main/App";

export default function WindowHeader() {
    function close() {
        Close().then();
    }

    function minimise() {
        Minimise().then((isMinimised: boolean) => {
            console.log(isMinimised);
        });
    }

    function maximise() {
        ToggleMaximise().then((isMaximised: boolean) => {
            console.log(isMaximised);
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
                        x
                    </div>
                </button>
                <button
                    onClick={minimise}
                    className="__global-no-drag group flex justify-center items-center transition w-8"
                >
                    <div
                        className="flex justify-center items-center transition rounded-full text-transparent group-hover:text-[#733e01] w-4 h-4 bg-[#ffbd2e]"
                    >
                        -
                    </div>
                </button>
                <button
                    onClick={maximise}
                    className="__global-no-drag group flex justify-center items-center transition w-8"
                >
                    <div
                        className="flex justify-center items-center transition rounded-full text-transparent group-hover:text-[#01540d] w-4 h-4 bg-[#27c93f]"
                    >
                        \
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