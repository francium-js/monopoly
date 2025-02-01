import { createContext } from 'react'
import { ModalContextT } from 'src/contexts/modal-provider/types'

export const ModalContext = createContext<ModalContextT | null>(null)
