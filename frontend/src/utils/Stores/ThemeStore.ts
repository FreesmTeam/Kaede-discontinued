import { create } from 'zustand';
import { ThemeStoreType } from "@/types/Stores/ThemeStore.type";

export const useThemeStore = create<ThemeStoreType>((set) => ({
    theme: {
        colorScheme: "dark",
        opacity: {
            inside: "0.85",
            outside: "0.95",
            divider: "1",
        },
    },
    setTheme: (theme: {
        colorScheme: string;
        opacity: {
            inside: string;
            outside: string;
            divider: string;
        };
    }) => set({ theme: theme }),
}));