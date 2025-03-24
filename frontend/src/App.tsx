import React, { useState } from 'react';
import { Greet } from "../wailsjs/go/main/App";

function App() {
    const [resultText, setResultText] = useState("Please, click the button");
    const updateResultText = (result: string) => setResultText(result);

    function greet() {
        Greet("wails победа").then(updateResultText);
    }

    return (
        <div id="App">
            <div id="result" className="result text-rose-900">
                {resultText}
            </div>
            <button className="bg-amber-900" onClick={greet}>
                Greet
            </button>
        </div>
    );
}

export default App;
