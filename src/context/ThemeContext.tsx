import React, { useState, useMemo, ReactNode, useEffect, useCallback } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { ThemeMode } from '../types/theme.tsx'
import { lightTheme, darkTheme } from '../theme/themes.tsx'
import { ThemeContext, ThemeContextProps } from './ThemeContextDefinitions.tsx'
interface Props {
    children: ReactNode
}
export const ThemeContextProvider: React.FC<Props> = ({ children }) => {
    const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
        const storedTheme = localStorage.getItem('themeMode') as ThemeMode | null
        return storedTheme ? storedTheme : 'light'
    })
    useEffect(() => {
        localStorage.setItem('themeMode', themeMode)
    }, [themeMode])
    const toggleTheme = useCallback(() => {
        setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
    }, [])
    const theme = useMemo(() => (themeMode === 'light' ? lightTheme : darkTheme), [themeMode])
    const contextValue: ThemeContextProps = useMemo(
        () => ({
            themeMode,
            toggleTheme,
        }),
        [themeMode, toggleTheme]
    )
    return (
        <ThemeContext.Provider value={contextValue}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}

export { ThemeContext }
