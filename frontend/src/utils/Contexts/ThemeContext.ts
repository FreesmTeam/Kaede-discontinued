import { createContext, Dispatch, SetStateAction } from "react";

export const ThemeContext = createContext<{
    theme: {
        theme: string;
        opacity: {
            inside: string;
            outside: string;
        };
    };
    setTheme: Dispatch<SetStateAction<string>>;
}>({
    theme: {
        theme: "dark",
        opacity: {
            inside: "0.5",
            outside: "0.5",
        },
    },
    setTheme: () => {},
});