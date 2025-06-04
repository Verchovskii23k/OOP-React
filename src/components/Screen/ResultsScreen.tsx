import React, { useContext, useState } from 'react'
import { ThemeContext } from '../../context/ThemeContextDefinitions.tsx'
import { GameState } from '../../types/types.ts'
import PlayerRecordsList from '../Logic/PlayerRecordsList.tsx'
import { useTheme } from '@mui/material/styles'
import {
    Typography,
    Button,
    Box,
} from '@mui/material'

interface ResultsScreenProps {
    gameState: GameState
    resetGame: () => void
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ gameState, resetGame }) => {
    const { toggleTheme, themeMode } = useContext(ThemeContext)
    const [showRecords, setShowRecords] = useState<boolean>(false)
    const theme = useTheme()

    const handleShowRecords = (): void => {
        setShowRecords(!showRecords)
    }

    const handleResetGame = () => {
        resetGame()
    }

    return (
        <Box sx={{
            width: '100%',
            maxWidth: '700px',
            minWidth: '300px',
            height: 'auto',
            minHeight: '300px',
            margin: '0 auto',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: theme.spacing(3),
            bgcolor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            borderRadius: 2,
            boxShadow: 1,
            overflow: 'hidden',
        }} className={themeMode === 'dark' ? 'dark-mode' : 'light-mode'} data-testid="results-screen">
            <Button onClick={toggleTheme} variant="contained" sx={{ position: 'absolute', top: theme.spacing(0), right: theme.spacing(0) }} data-testid="toggle-theme-button">
                Сменить тему
            </Button>
            <Typography variant="h4" component="h1" gutterBottom sx={{ color: theme.palette.text.primary }}>
                Результаты игры
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ color: theme.palette.text.primary }}>
                {gameState.winner ? `Игрок ${gameState.winner.name} победил!` : 'Ничья!'}
            </Typography>
            <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
                Игрок {gameState.players[0].name} набрал: {gameState.players[0].score} очков
            </Typography>
            <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
                Игрок {gameState.players[1].name} набрал: {gameState.players[1].score} очков
            </Typography>
            <Button variant="contained" color="primary" onClick={handleResetGame} sx={{ mt: 3 }} data-testid="reset-game-button">
                Начать новую игру
            </Button>
            <Button variant="outlined" onClick={handleShowRecords} sx={{ mt: 2 }} data-testid="toggle-records-button">
                {showRecords ? 'Скрыть рекорды' : 'Показать рекорды'}
            </Button>
            {showRecords && <PlayerRecordsList data-testid="player-records-list" />}
        </Box>
    )
}

export default ResultsScreen