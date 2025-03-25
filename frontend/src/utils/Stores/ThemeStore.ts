import { create } from 'zustand';
import { ThemeStoreType } from "../../types/Stores/ThemeStore.type";

export const useThemeStore = create<ThemeStoreType>((set) => ({
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