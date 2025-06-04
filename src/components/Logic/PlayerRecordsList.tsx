import React from 'react'
import { getPlayerRecords } from './localStorageUtils.tsx'

interface PlayerRecord {
  name: string
  score: number
}

const PlayerRecordsList: React.FC = () => {
  const records: PlayerRecord[] = getPlayerRecords()

  if (!records || records.length === 0) {
    return <p>Рекордов пока нет!</p>
  }

  return (
    <div>
      <h3>Топ игроков:</h3>
      <ul>
        {records.map((record, index) => (
          <li key={index}>
            {record.name} - {record.score}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PlayerRecordsList