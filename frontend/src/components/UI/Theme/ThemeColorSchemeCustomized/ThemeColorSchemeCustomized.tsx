import { useThemeStore } from "@/utils/Stores/ThemeStore";
import { ThemeStoreType } from "@/types/Stores/ThemeStore.type";

export default function ThemeColorSchemeCustomized() {
    const { theme, setTheme } = useThemeStore((state: ThemeStoreType) => state);
    const colorSchemesToSwitch: {
        [key: string]: string;
    } = {
        "dark": "light",
        "light": "dark",
    };

    return (
        <div>
            <div>
                Current color scheme: {theme.colorScheme}
            </div>
            <button onClick={() => {
                setTheme({
                    ...theme,
                    colorScheme: colorSchemesToSwitch[theme.colorScheme],
                });
            }}>
                switch to {colorSchemesToSwitch[theme.colorScheme]}
            </button>
        </div>
    );
}