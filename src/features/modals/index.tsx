import type { ReactPortal } from 'react'
import { createPortal } from 'react-dom'
import { useModals } from 'src/contexts/modal-provider/useModals'
import modalsList from 'src/features/modals/modalsList'
import type { ModalsPropsT } from 'src/features/modals/types'
import type { UnionToIntersection } from 'src/types'

const Modals = (): ReactPortal | null => {
  const { modal, onClose } = useModals()

  const Component = modalsList.find(({ name }) => name === modal.name)?.component

  return Component
    ? createPortal(
        <Component
          name={modal.name}
          closeModal={onClose}
          data={modal.data as UnionToIntersection<ModalsPropsT>}
        />,
        document.querySelector('#modal-root') as HTMLElement,
      )
    : null
}

export default Modals
