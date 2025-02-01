import { PropsWithChildren, useMemo, useState } from 'react'
import { ModalContext } from 'src/contexts'
import { initialModalData } from 'src/contexts/modal-provider/constants'
import type { ModalContextT, ModalDataT } from 'src/contexts/modal-provider/types'
import Modals from 'src/features/modals'

const ModalProvier = ({ children }: PropsWithChildren): JSX.Element => {
  const [modalData, setModalData] = useState<ModalDataT>(initialModalData)

  const onClose = (): void => {
    setModalData(initialModalData)
  }

  const onOpen = (modal: ModalDataT): void => {
    setModalData(modal)
  }

  const providerValue: ModalContextT = useMemo(
    () => ({ modal: modalData, onClose, onOpen }),
    [modalData],
  )

  return (
    <ModalContext.Provider value={providerValue}>
      {children} <Modals />
    </ModalContext.Provider>
  )
}

export default ModalProvier
