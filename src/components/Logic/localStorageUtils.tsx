const LOCAL_STORAGE_KEY = 'playerRecords'

interface PlayerRecord {
  name: string
  score: number
}

export const getPlayerRecords = (): PlayerRecord[] => {
  try {
    const recordsString = localStorage.getItem(LOCAL_STORAGE_KEY)
    return recordsString ? JSON.parse(recordsString) : []
  } catch (error) {
    console.error("Ошибка при загрузке рекордов из localStorage:", error)
    return []
  }
}

export const savePlayerRecord = (playerName: string, score: number): void => {
  try {
    const records: PlayerRecord[] = getPlayerRecords()
    if (score <= 0) {
      return
    }
    const existingPlayerIndex = records.findIndex(record => record.name === playerName)

    if (existingPlayerIndex !== -1) {

      if (score > records[existingPlayerIndex].score) {
        records[existingPlayerIndex].score = score
      }
    } else {

      records.push({ name: playerName, score: score })
    }

    records.sort((a, b) => b.score - a.score)

    const topRecords = records.slice(0, 5)

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(topRecords))
  } catch (error) {
    console.error("Ошибка при сохранении рекорда в localStorage:", error)
  }
}