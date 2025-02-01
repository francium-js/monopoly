import { useContext } from 'react'
import { ModalContext } from 'src/contexts'
import type { ModalContextT } from 'src/contexts/modal-provider/types'

export const useModals = (): ModalContextT => {
  const data = useContext(ModalContext)

  if (!data) {
    throw new Error('useModals was used outside of its Provider')
  }

  return data
}
