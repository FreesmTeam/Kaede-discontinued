import React, { useEffect, useRef } from "react";
import { useThrottledState } from "@mantine/hooks";

export default function MinecraftLogs() {
    // runtime.EventsOn() can trigger like 1000+ re-renders per second
    // so i'm kinda throttling its updates
    const logsBuffer = useRef<Array<string>>([]);
    const [minecraftLogs, setMinecraftLogs] = useThrottledState<Array<string>>([], 200);

    useEffect(() => {
        // eslint-disable-next-line
        // @ts-ignore
        const runtime = globalThis.runtime;
        const cleanup = runtime.EventsOn("javaLogs", (line: string) => {
            logsBuffer.current.push(line);
            setMinecraftLogs([...logsBuffer.current]);

            if (line.includes("[Render thread/INFO]: Stopping!")) {
                logsBuffer.current = [];

                return;
            }
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

    return (
        <div className="flex flex-col max-h-[30vh] overflow-auto">
            {
                minecraftLogs.map((line: string, index: number) => {
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