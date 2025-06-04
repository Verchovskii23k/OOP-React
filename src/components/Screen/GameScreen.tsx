import React, { useContext, useState } from 'react'
import { ThemeContext } from '../../context/ThemeContextDefinitions.tsx'
import { GameState } from '../../../src/types/types.ts'
import Timer from './Components_GS/Timer.tsx'
import WordInput from './Components_GS/WordInput.tsx'
import CurrentPlayer from './Components_GS/CurrentPlayer.tsx'
import { useTheme } from '@mui/material/styles'
import { Box, Typography, Button, Grid, List, Collapse, ListItemButton } from '@mui/material'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

interface GameScreenProps {
    gameState: GameState
    submitWord: () => void
    endTurn: () => void
    handleCurrentWordChange: (word: string) => void
}

const GameScreen: React.FC<GameScreenProps> = ({ gameState, submitWord, endTurn, handleCurrentWordChange }) => {
    const { toggleTheme, themeMode } = useContext(ThemeContext)
    const currentPlayer = gameState.players[gameState.currentPlayerIndex]
    const [openPlayer1, setOpenPlayer1] = useState(false)
    const [openPlayer2, setOpenPlayer2] = useState(false)
    const theme = useTheme()

    return (
        <Box sx={{
            width: '100%',
            height: 'auto',
            minWidth: '600px',
            minHeight: '700px',
            display: 'flex',
            flexDirection: 'column',
            margin: '0 auto',
            alignItems: 'center',
            justifyContent: 'space-around',
            padding: theme.spacing(0),
            bgcolor: theme.palette.background.default,
            color: theme.palette.text.primary,
            overflow: 'hidden',
        }} className={themeMode === 'dark' ? 'dark-mode' : 'light-mode'} data-testid="game-screen">
            <Button onClick={toggleTheme} variant="contained" sx={{ position: 'absolute', top: theme.spacing(1), right: theme.spacing(1) }} data-testid="toggle-theme-button">
                Сменить тему
            </Button>
            <Typography variant="h2" align="center" gutterBottom sx={{ color: theme.palette.text.primary }} data-testid="base-word">
                Игровое слово: {gameState.baseWord}
            </Typography>
            <Grid container spacing={3} justifyContent="center" sx={{ width: '90%', maxWidth: 1200 }}>
                <Grid >
                    <Box sx={{
                        bgcolor: theme.palette.background.paper,
                        p: 2,
                        borderRadius: 2,
                    }}>
                        <ListItem onClick={() => setOpenPlayer1(!openPlayer1)} disablePadding data-testid="player1-list-item">
                            <ListItemButton>
                                <AccountCircleIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                                <ListItemText primary={`Игрок: ${gameState.players[0].name} (Всего: ${gameState.players[0].score} очков)`}
                                sx={{maxWidth: '90%', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}}/>
                                {openPlayer1 ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                        </ListItem>
                        <Collapse in={openPlayer1} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding sx={{ maxHeight: 200, overflow: 'auto' }}>
                                {gameState.players[0].words.map((word, index) => (
                                    <ListItem key={index} sx={{ pl: 4 }} data-testid={`player1-word-${index}`}>
                                        <ListItemText primary={word} secondary={`Очки: ${word.length}`} 
                                        sx={{maxWidth: '90%', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}}/>
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                    </Box>
                </Grid>
                <Grid>
                    <CurrentPlayer currentPlayer={currentPlayer} data-testid="current-player" />
                    <Timer timer={gameState.timer} data-testid="timer" />
                    <Button variant="contained" color="primary" onClick={submitWord} sx={{ mt: 2, width: '250px', height: '75px', borderRadius: '50%' }} data-testid="submit-word-button">
                        Ответ
                    </Button>
                </Grid>
                <Grid>
                    <Box sx={{
                        bgcolor: theme.palette.background.paper,
                        p: 2,
                        borderRadius: 2,
                    }}>
                        <ListItem onClick={() => setOpenPlayer2(!openPlayer2)} disablePadding data-testid="player2-list-item">
                            <ListItemButton>
                                <AccountCircleIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                                <ListItemText primary={`Игрок: ${gameState.players[1].name} (Всего: ${gameState.players[1].score} очков)`} />
                                {openPlayer2 ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                        </ListItem>
                        <Collapse in={openPlayer2} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding sx={{ maxHeight: 200, overflow: 'auto' }}>
                                {gameState.players[1].words.map((word, index) => (
                                    <ListItem key={index} sx={{ pl: 4 }} data-testid={`player2-word-${index}`}>
                                        <ListItemText primary={word} secondary={`Очки: ${word.length}`} />
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                    </Box>
                </Grid>
            </Grid>
            <Box sx={{ mt: 3, textAlign: 'center' }}>
                <WordInput
                    currentWord={gameState.currentWord}
                    handleCurrentWordChange={handleCurrentWordChange}
                    submitWord={submitWord}
                    data-testid="word-input"
                />
            </Box>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Button variant="contained" color="secondary" onClick={endTurn} data-testid="end-turn-button">
                    Сдаться
                </Button>
            </Box>
        </Box>
    )
}

export default GameScreen