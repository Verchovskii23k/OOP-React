import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContextDefinitions.tsx';
import { Player } from '../../types/types.ts';
import { useTheme } from '@mui/material/styles';
import {
    Typography,
    TextField,
    Button,
    Box,
    Grid,
} from '@mui/material';

interface RegistrationScreenProps {
    players: Player[];
    handlePlayerNameChange: (playerId: number, name: string) => void;
    startGame: () => void;
}

const RegistrationScreen: React.FC<RegistrationScreenProps> = ({ players, handlePlayerNameChange, startGame }) => {
    const { toggleTheme, themeMode } = useContext(ThemeContext);
    const theme = useTheme();

    const handleStartGame = () => {
        if (players.every(p => p.name && p.name.trim() !== '')) {
            startGame();
        } else {
            alert('Пожалуйста, введите имена игроков.');
        }
    };

    return (
        <Box sx={{
            width: '90%',
            maxWidth: '600px',
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
        }} className={themeMode === 'dark' ? 'dark-mode' : 'light-mode'} data-testid="registration-screen">
            <Button onClick={toggleTheme} variant="contained" sx={{ position: 'absolute', top: theme.spacing(0), right: theme.spacing(0) }} data-testid="toggle-theme-button">
                Сменить тему
            </Button>
            <Typography variant="h4" component="h1" gutterBottom sx={{ color: theme.palette.text.primary }}>
                Регистрация игроков
            </Typography>
            <Grid container spacing={5}>
                <Grid>
                    <TextField
                        margin="normal"
                        fullWidth
                        value={players[0].name}
                        onChange={(e) => handlePlayerNameChange(1, e.target.value)}
                        placeholder="Введите имя игрока 1"
                        data-testid="player1_input"
                    />
                </Grid>
                <Grid>
                    <TextField
                        margin="normal"
                        fullWidth
                        value={players[1].name}
                        onChange={(e) => handlePlayerNameChange(2, e.target.value)}
                        placeholder="Введите имя игрока 2"
                        data-testid="player2_input"
                    />
                </Grid>
            </Grid>
            <Button variant="contained" color="primary" onClick={handleStartGame} sx={{ mt: 10 }} data-testid="start-game-button">
                Начать игру
            </Button>
        </Box>
    );
};

export default RegistrationScreen;