import React from 'react';
import { Close, Minimise, Maximise, Unmaximise } from "../../../wailsjs/go/main/App";
import '../../style.css';

export default function WindowHeader() {
    function close() {
        Close().then();
    }

    function minimise() {
        Minimise().then();
    }

    function maximise() {
        Maximise().then((isMaximised: boolean) => {
            console.log(isMaximised);
        });
        Unmaximise().then((isMaximised: boolean) => {
            console.log(isMaximised);
        });
    }
    
    return (
        <div>
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