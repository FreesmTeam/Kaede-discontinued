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
        <div className="flex justify-end">
            <div className="__global-no-drag flex w-fit">
                <button
                    onClick={close}
                >
                    close
                </button>
                <button
                    onClick={minimise}
                >
                    minimise
                </button>
                <button
                    onClick={maximise}
                >
                    maximise
                </button>
            </div>
        </div>
    );
}