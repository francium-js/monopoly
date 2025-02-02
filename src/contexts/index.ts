import { createContext } from 'react'
import { GameContextT } from 'src/contexts/game-provider/types'
import { ModalContextT } from 'src/contexts/modal-provider/types'

export const ModalContext = createContext<ModalContextT | null>(null)

export const GameContext = createContext<GameContextT | null>(null)
