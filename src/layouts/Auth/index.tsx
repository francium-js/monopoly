import { Outlet } from 'react-router-dom'
import ModalProvier from 'src/contexts/modal-provider'

const AuthLayout = (): JSX.Element => {
  return (
    <div>
      <ModalProvier>
        <Outlet />
      </ModalProvier>
    </div>
  )
}

export default AuthLayout
