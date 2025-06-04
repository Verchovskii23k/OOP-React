import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContextDefinitions.tsx';
import { useTheme } from '@mui/material/styles';
import {
    Typography,
    List,
    ListItem,
    ListItemText,
    Button,
    Box,
} from '@mui/material';

interface RulesScreenProps {
    navigateToScreen: (screen: string) => void;
}

const RulesScreen: React.FC<RulesScreenProps> = ({ navigateToScreen }) => {
    const { toggleTheme, themeMode } = useContext(ThemeContext);
    const theme = useTheme();

    return (
        <Box sx={{ width: '100%', maxWidth: '1200px', minWidth: '600px', height: 'auto',
            minHeight: '300px', margin: '0 auto', position: 'absolute', top: '50%',
            left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column',
            alignItems: 'center', padding: theme.spacing(3),
            bgcolor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            borderRadius: 2, boxShadow: 1, overflow: 'hidden',
        }} className={themeMode === 'dark' ? 'dark-mode' : 'light-mode'} data-testid="rules-screen">
            <Button onClick={toggleTheme} variant="contained" sx={{ position: 'absolute', top: theme.spacing(0), right: theme.spacing(0) }} data-testid="toggle-theme-button">
                Сменить тему
            </Button>
            <Typography variant="h4" component="h1" gutterBottom sx={{ color: theme.palette.text.primary }}>
                Правила игры "Наборщик"
            </Typography>
            <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                Добро пожаловать в игру "Наборщик"! Цель игры - набрать как можно больше очков, чем соперник, составляя слова из букв заданного слова.
            </Typography>
            <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>Правила игры:</Typography>
            <List sx={{ width: '100%' }}>
                <ListItem>
                    <ListItemText primary="Можно использовать буквы только из стартового слова и только в таком количестве, в котором они есть в этом слове." sx={{ color: theme.palette.text.primary }} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Вместо буквы Ё используйте букву Е." sx={{ color: theme.palette.text.primary }} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Нельзя использовать стартовое слово или слова, которые уже ранее были использованы." sx={{ color: theme.palette.text.primary }} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Количество очков пропорционально количеству букв во введенном игроком слове." sx={{ color: theme.palette.text.primary }} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Если в течение минуты не будет введено слово от игрока, то игра завершается и производится подсчет очков." sx={{ color: theme.palette.text.primary }} />
                </ListItem>
            </List>
            <Button variant="contained" size="large" color="primary" onClick={() => navigateToScreen('registration')} sx={{ mt: 3 }} data-testid="navigate-to-register-button">
                Перейти к регистрации
            </Button>
        </Box>
    );
};

export default RulesScreen;