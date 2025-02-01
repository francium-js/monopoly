import type { ModalsEnum } from 'src/enums'
import type modalsList from 'src/features/modals/modalsList'
import type { ValueOf } from 'src/types'

type ExtractData<T> = T extends [{ data: infer D }] ? D : never

export type ModalsPropsT = ExtractData<
  Parameters<(typeof modalsList)[number]['component']>
>

export type ModalDialogProps = {
  title?: string
  description?: string
  name: ValueOf<ModalsEnum> | ''
  closeModal?: () => void
}
