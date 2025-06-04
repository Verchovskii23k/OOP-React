import React from 'react'
import { ThemeMode } from '../types/theme.tsx'

export interface ThemeContextProps {
    themeMode: ThemeMode
    toggleTheme: () => void
}

export const ThemeContext = React.createContext<ThemeContextProps>({
    themeMode: 'light',
    toggleTheme: () => {},
})