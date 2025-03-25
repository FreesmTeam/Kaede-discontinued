import { create } from 'zustand';

export const useThemeStore = create((set) => ({
    theme: {
        colorScheme: "dark",
        opacity: {
            inside: "0.5",
            outside: "0.9",
        },
    },
    setTheme: (theme: {
        colorScheme: string;
        opacity: {
            inside: string;
            outside: string;
        };
    }) => set({ theme: theme }),
}));