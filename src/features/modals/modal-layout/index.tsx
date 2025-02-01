import type { HTMLProps } from 'react'
import { cn } from 'src/helpers/cn'
import { useModals } from 'src/contexts/modal-provider/useModals'
import type { ModalDialogProps } from 'src/features/modals/types'

type ModalsLayoutProps = HTMLProps<HTMLDivElement> &
  Pick<ModalDialogProps, 'closeModal' | 'description' | 'title'>

const ModalsLayout = ({
  children,
  className,
  closeModal,
  description,
  title,
  ...props
}: ModalsLayoutProps): JSX.Element => {
  const { onClose } = useModals()

  return (
    <div
      className={cn(
        'overflow-hidden bg-black/40 backdrop-blur-sm z-50 fixed w-screen h-screen top-0 left-0 flex justify-center items-center',
      )}
      onClick={closeModal}
      {...props}
    >
      <div
        className={
          'absolute flex-col flex items-center justify-center rounded-lg bg-white p-3.5'
        }
        aria-hidden="true"
        onClick={e => {
          e.stopPropagation()
        }}
      >
        <div className={'flex gap-5 justify-between w-full px-2 items-center'}>
          <div className={'flex flex-col'}>
            <span className={'font-semibold'}>{title}</span>
            {description && <span className={'description'}>{description}</span>}
          </div>

          <div
            onClick={onClose}
            className={'h-6 w-6 rounded p-1 bg-red fill-red cursor-pointer'}
          />
        </div>

        <hr className={cn('opacity-10 w-full mt-2 mb-4', className)} />
        {children}
      </div>
    </div>
  )
}

export default ModalsLayout
