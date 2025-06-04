export type Player = {
  id: number
  name: string
  score: number
  words: string[]
}


export type GameScreen = 'rules' | 'registration' | 'game' | 'results'

export type GameState = {
  currentScreen: GameScreen
  players: Player[]
  currentPlayerIndex: number
  baseWord: string
  currentWord: string
  timer: number
  winner: Player | null
  gameStarted: boolean
  lastValidWordTime: number | null
}