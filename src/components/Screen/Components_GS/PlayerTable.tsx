import React from 'react'

interface PlayerTableProps {
    playerName: string
    playerScore: number
    playerWords: string[]
}

const PlayerTable: React.FC<PlayerTableProps> = ({ playerName, playerScore, playerWords }) => {
    return (
        <div>
            <h3>Игрок: {playerName}</h3>
            <p>Всего: {playerScore} очков</p>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Введенное слово</th>
                            <th>Очки</th>
                        </tr>
                    </thead>
                    <tbody>
                        {playerWords.map((word, i) => (
                            <tr key={i}>
                                <td>{word}</td>
                                <td>{word.length}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PlayerTable