import React from 'react';
import { Close } from "../../../wailsjs/go/main/App";

export default function WindowHeader() {
    function close() {
        Close().then();
    }

    return (
        <div>
            <button
                onClick={close}
            >
                close
            </button>
        </div>
    );
}