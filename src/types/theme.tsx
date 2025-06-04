export type ThemeMode = 'light' | 'dark'

export interface ThemeContextProps {
    themeMode: ThemeMode
    toggleTheme: () => void
}