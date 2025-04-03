import React, { useState, useEffect, useRef } from "react";

export default function MinecraftLogs() {
    const minecraftLogs = useRef<Array<string>>([]);
    const rerender = useState(0)[1];
    const [debouncedValue, setValue] = useDebounceValue(defaultValue, 500)


    useEffect(() => {
        // runtime.EventsOn() can trigger like 1000+ re-renders per second
        // so i'm kinda throttling its updates

        // eslint-disable-next-line
        // @ts-ignore
        const runtime = globalThis.runtime;
        const cleanup = runtime.EventsOn("javaLogs", (line: string) => {
            minecraftLogs.current.push(line);
        });

        runtime.EventsOn("javaError", (error: string) => {
            console.error("Java error:", error);
        });

        return () => {
            cleanup?.();
            runtime.EventsOff("javaLogs");
            runtime.EventsOff("javaError");
        };
    }, []);
    console.log('MinecraftLogs rerender', minecraftLogs);
    return (
        <div className="flex flex-col max-h-[30vh] overflow-auto">
            {
                minecraftLogs.current.map((line: string, index: number) => {
                    return (
                        <div className="text-rose-100 text-sm" key={`${index}_${line}`}>
                            {line}
                        </div>
                    );
                })
            }
        </div>
    );
}