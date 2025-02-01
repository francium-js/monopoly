import type { TemplateProps } from 'src/features/modals/template/types'
import ModalLayout from 'src/features/modals/modal-layout'

const TemplateModal = ({ closeModal }: TemplateProps): JSX.Element => {
  return <ModalLayout closeModal={closeModal}></ModalLayout>
}

export default TemplateModal
