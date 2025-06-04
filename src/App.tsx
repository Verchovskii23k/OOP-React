import React from 'react'
import Game from './components/Logic/Game.tsx'
import { ThemeContextProvider } from './context/ThemeContext.tsx'
const App: React.FC = () => {
  return (
    <ThemeContextProvider>
      <Game />
    </ThemeContextProvider>
  )
}
export default App