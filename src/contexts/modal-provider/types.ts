import type { ModalsEnum } from 'src/enums'
import type { ModalsPropsT } from 'src/features/modals/types'
import type { ValueOf } from 'src/types'

export type ModalContextT = {
  modal: ModalDataT
  onClose: () => void
  onOpen: (modal: ModalDataT) => void
}

export type ModalDataT = {
  name: ValueOf<ModalsEnum> | ''
  data?: ModalsPropsT
}
