export type ThemeStoreType = {
    theme: {
        colorScheme: string;
        opacity: {
            inside: string;
            outside: string;
        };
    };
    setTheme: (theme: {
        colorScheme: string;
        opacity: {
            inside: string;
            outside: string;
        };
    }) => void;
};