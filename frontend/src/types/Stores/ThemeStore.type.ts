type ThemeType = {
    colorScheme: string;
    opacity: {
        inside: string;
        outside: string;
        divider: string;
    };
};

export type ThemeStoreType = {
    theme: ThemeType,
    setTheme: (theme: ThemeType) => void;
};