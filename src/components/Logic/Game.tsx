import React, { useState, useEffect, useRef, useCallback } from 'react'
import { GameState } from '../../types/types.ts'
import { savePlayerRecord } from '../Logic/localStorageUtils.tsx'
import RulesScreen from '../Screen/RulesScreen.tsx'
import RegistrationScreen from '../Screen/RegistrationScreen.tsx'
import GameScreenComponent from '../Screen/GameScreen.tsx'
import ResultsScreen from '../Screen/ResultsScreen.tsx'

const Game: React.FC = () => {
    const [gameState, setGameState] = useState<GameState>({
        currentScreen: 'rules',
        players: [
            { id: 1, name: '', score: 0, words: [] },
            { id: 2, name: '', score: 0, words: [] },
        ],
        currentPlayerIndex: 0,
        baseWord: '',
        currentWord: '',
        timer: 60,
        winner: null,
        gameStarted: false,
        lastValidWordTime: null,
    })
    const timerRef = useRef<number | null>(null)

    const [dictionary, setDictionary] = useState<string[]>([])

    const loadDictionary = useCallback(async () => {
        try {
            const storedDictionary = sessionStorage.getItem('gameDictionary')
            let wordsArray: string[]
            if (storedDictionary) {
                try {
                    wordsArray = JSON.parse(storedDictionary)
                    console.log("Словарь загружен из sessionStorage")
                } catch (error) {
                    console.error("Ошибка при парсинге словаря из sessionStorage:", error)
                    wordsArray = []
                }
            } else {
                wordsArray = []
            }
            if (wordsArray.length === 0) {
                const response = await fetch('./dictionary.txt')
                if (!response.ok) {
                    throw new Error(`Ошибка загрузки файла: ${response.status}`)
                }
                const text = await response.text()
                wordsArray = text.split('\n').map(word => word.trim()).filter(word => word !== '')
                sessionStorage.setItem('gameDictionary', JSON.stringify(wordsArray))
                console.log("Словарь загружен из файла и сохранен в sessionStorage")
            }
            setDictionary(wordsArray)
        } catch (error) {
            console.error('Ошибка при загрузке словаря:', error)
            alert('Словарь не найден!')
        }
    }, [])
    
    useEffect(() => {
        loadDictionary()
    }, [loadDictionary])

    const setBaseWord = useCallback(() => {
        if (dictionary.length > 0) {
            const validWords = dictionary.filter(word => word.length >= 12)
            if (validWords.length > 0) {
                const randomIndex = Math.floor(Math.random() * validWords.length)
                setGameState(prev => ({ ...prev, baseWord: validWords[randomIndex].toUpperCase() }))
            } else {
                console.log('В словаре нет слов длиной не менее 12 символов!')
                alert('В словаре нет слов длиной не менее 12 символов! Игра не может быть начата.')
                setGameState(prev => ({ ...prev, currentScreen: 'rules' }))
            }
        }
    }, [dictionary])
    useEffect(() => {
        if (dictionary.length > 0) {
            setBaseWord()
        }
    }, [dictionary, setBaseWord])


    const handlePlayerNameChange = (playerId: number, name: string): void => {
        setGameState(prev => ({
            ...prev,
            players: prev.players.map(player =>
                player.id === playerId ? { ...player, name } : player
            ),
        }))
    }

    const handleCurrentWordChange = (word: string): void => {
        setGameState(prev => ({ ...prev, currentWord: word }))
    }

    const startGame = (): void => {
        const { players } = gameState
        setBaseWord()
        if (players[0].name === players[1].name) {
            alert('Имена игроков не могут совпадать!')
            return
        }
        if (players.some(p => p.name.length > 14)) {
            alert("Имена слишком длинные")
            return
        }
        if (players.every(p => p.name && p.name.trim() !== '')) {
            setGameState(prev => ({
                ...prev,
                currentScreen: 'game',
                timer: 60,
                currentPlayerIndex: 0,
                gameStarted: true,
                lastValidWordTime: Date.now(),
            }))
        } else {
            alert('Пожалуйста, введите имена игроков.')
        }
    }

    const endTurn = (): void => {
        if (timerRef.current) clearInterval(timerRef.current)
        setGameState(prev => ({
            ...prev,
            currentPlayerIndex: (prev.currentPlayerIndex + 1) % 2,
            timer: 60,
            currentWord: '',
            lastValidWordTime: Date.now(),
        }))
    }

    const submitWord = (): void | string => {
        const { currentWord, players, baseWord } = gameState
        if (!currentWord || currentWord.length < 2) return
        const isValid = validateWord(currentWord, baseWord)
        if (!isValid) {
            alert('Такое слово нельзя составить!')
            return
        }
        if (!dictionary.includes(currentWord.toLowerCase())) {
            alert('Такого слова не существует в словаре!')
            return
        }
        const isWordUsed = players.some(player =>
            player.words.some(w => w.toLowerCase() === currentWord.toLowerCase())
        )
        if (isWordUsed) {
            alert('Это слово уже было использовано!')
            return
        }
        setGameState(prev => {
            const updatedPlayers = [...prev.players]
            updatedPlayers[prev.currentPlayerIndex] = {
                ...updatedPlayers[prev.currentPlayerIndex],
                words: [...updatedPlayers[prev.currentPlayerIndex].words, currentWord],
                score: updatedPlayers[prev.currentPlayerIndex].score + currentWord.length,
            }
            return {
                ...prev,
                players: updatedPlayers,
                currentWord: '',
                lastValidWordTime: Date.now(),
            }
        })
        endTurn()
    }

    const validateWord = (word: string, baseWord: string): boolean => {
        const baseLetters = baseWord.toLowerCase().split('')
        const wordLetters = word.toLowerCase().split('')
        const tempBaseLetters = [...baseLetters]
        return wordLetters.every(letter => {
            const index = tempBaseLetters.indexOf(letter)
            if (index !== -1) {
                tempBaseLetters.splice(index, 1)
                return true
            }
            return false
        })
    }

    const endGame = (): void => {
        const [player1, player2] = gameState.players
        const winner = player1.score > player2.score ? player1 : player2.score > player1.score ? player2 : null
        savePlayerRecord(player1.name, player1.score)
        savePlayerRecord(player2.name, player2.score)
        setGameState(prev => ({
            ...prev,
            winner,
            gameStarted: false,
            currentScreen: 'results',
        }))
    }

    const resetGame = (): void => {
        setGameState({
            currentScreen: 'rules',
            players: [
                { id: 1, name: '', score: 0, words: [] },
                { id: 2, name: '', score: 0, words: [] },
            ],
            currentPlayerIndex: 0,
            baseWord: '',
            currentWord: '',
            timer: 60,
            winner: null,
            gameStarted: false,
            lastValidWordTime: null,
        })
    }

    useEffect(() => {
        let intervalId: number | null = null
        if (gameState.currentScreen === 'game' && gameState.timer > 0) {
            intervalId = setInterval(() => {
                setGameState(prev => {
                    const newTimer = prev.timer - 1
                    const timeSinceLastValidWord = prev.lastValidWordTime
                        ? (Date.now() - prev.lastValidWordTime) / 1000
                        : 60
                    if (newTimer <= 0 || timeSinceLastValidWord >= 600) {
                        clearInterval(intervalId as number)
                        const [player1, player2] = prev.players
                        const winner = player1.score > player2.score ? player1 : player2.score > player1.score ? player2 : null
                        savePlayerRecord(player1.name, player1.score)
                        savePlayerRecord(player2.name, player2.score)
                        return {
                            ...prev,
                            timer: 0,
                            currentScreen: 'results',
                            winner,
                            gameStarted: false,
                        }
                    }
                    return { ...prev, timer: newTimer }
                })
            }, 1000)
            timerRef.current = intervalId
        }
        return () => {
            if (intervalId) clearInterval(intervalId)
            timerRef.current = null
        }
    }, [gameState.currentScreen, gameState.timer, gameState.lastValidWordTime])

    const renderCurrentScreen = (): React.ReactNode => {
        switch (gameState.currentScreen) {
            case 'rules':
                return <RulesScreen navigateToScreen={() => setGameState(prev => ({ ...prev, currentScreen: 'registration' }))} />
            case 'registration':
                return (
                    <RegistrationScreen
                        players={gameState.players}
                        handlePlayerNameChange={handlePlayerNameChange}
                        startGame={startGame}
                    />
                )
            case 'game':
                return (
                    <GameScreenComponent
                        gameState={gameState}
                        submitWord={submitWord}
                        endTurn={endGame}
                        handleCurrentWordChange={handleCurrentWordChange}
                    />
                )
            case 'results':
                return <ResultsScreen gameState={gameState} resetGame={resetGame} />
            default:
                return <RulesScreen navigateToScreen={() => setGameState(prev => ({ ...prev, currentScreen: 'registration' }))} />
        }
    }

    return <div className="Game" data-testid="game-container">{renderCurrentScreen()}</div>
}

export default Game