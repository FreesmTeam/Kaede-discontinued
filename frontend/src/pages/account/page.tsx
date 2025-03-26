import React, { useState } from "react";
import { Greet } from "@/../wailsjs/go/main/App";

export default function AccountPage() {
    const [resultText, setResultText] = useState("Please, click the button");
    const updateResultText = (result: string) => setResultText(result);

    function greet() {
        Greet("wails победа").then(updateResultText);
    }
    return (
        <div className="z-20 h-32 w-24 bg-amber-800 text-white">
            <p>
                welcome to account page
            </p>
            <div id="result" className="result text-rose-900">
                {resultText}
            </div>
            <button className="bg-amber-900 text-white" onClick={greet}>
                Greet
            </button>
            {
                Array.from({ length: 100 }).map((_, index) => {
                    return (
                        <div key={index}>
                            lorem ipsum
                        </div>
                    );
                })
            }
        </div>
    );
}