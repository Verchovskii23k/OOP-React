import React from 'react'
import { Box, Typography, useTheme } from '@mui/material'

interface TimerProps {
    timer: number
}

const Timer: React.FC<TimerProps> = ({ timer }) => {
    const theme = useTheme()

    return (
        <Box sx={{
            padding: theme.spacing(2),
            borderRadius: 1,
            bgcolor: theme.palette.secondary.light,
            color: theme.palette.secondary.contrastText,
            textAlign: 'center',
            boxShadow: 3,
        }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Таймер: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}
            </Typography>
        </Box>
    )
}

export default Timer