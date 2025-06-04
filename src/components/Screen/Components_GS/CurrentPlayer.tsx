import React from 'react'
import { Player } from '../../../types/types.ts'
import { Box, Typography, useTheme } from '@mui/material'

interface CurrentPlayerProps {
    currentPlayer: Player
}

const CurrentPlayer: React.FC<CurrentPlayerProps> = ({ currentPlayer }) => {
    const theme = useTheme()

    return (
        <Box sx={{
            padding: theme.spacing(2),
            borderRadius: 1,
            bgcolor: theme.palette.primary.light,
            color: theme.palette.primary.contrastText,
            boxShadow: 3,
            textAlign: 'center',
            transition: 'background-color 0.3s ease',
            '&:hover': {
                bgcolor: theme.palette.primary.main,
                boxShadow: 5,
            },
        }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Ход игрока: {currentPlayer.name}
            </Typography>
        </Box>
    )
}

export default CurrentPlayer