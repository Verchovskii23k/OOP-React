// src/components/Screen/Components_GS/WordInput.tsx
import React from 'react'
import { TextField, useTheme } from '@mui/material'
interface WordInputProps {
    currentWord: string
    handleCurrentWordChange: (word: string) => void
    submitWord: () => void
}
const WordInput: React.FC<WordInputProps> = ({ currentWord, handleCurrentWordChange, submitWord }) => {
    const theme = useTheme()
    return (
        <TextField
            label="Введите слово"
            variant="outlined"
            value={currentWord}
            onChange={(e) => handleCurrentWordChange(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && submitWord()}
            fullWidth
            sx={{
                bgcolor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                borderRadius: 1,
                '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.divider,
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.primary.main,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.primary.main,
                    borderWidth: '2px',
                },
            }}
        />
    )
}
export default WordInput