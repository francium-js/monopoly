import { useContext } from 'react'
import { GameContext } from 'src/contexts'
import type { GameContextT } from 'src/contexts/game-provider/types'

export const useGame = (): GameContextT => {
  const data = useContext(GameContext)

  if (!data) {
    throw new Error('useGame was used outside of its Provider')
  }

  return data
}
