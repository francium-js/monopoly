import { createBrowserRouter } from 'react-router-dom'
import GameProvier from 'src/contexts/game-provider'
import AuthLayout from 'src/layouts/Auth'
import ErrorPage from 'src/pages/Error'
import GamePage from 'src/pages/Game'
import HomePage from 'src/pages/Home'
import { RoutesEnum } from 'src/routes/routes'

export const browserRouters = createBrowserRouter([
  {
    children: [
      { element: <HomePage />, path: RoutesEnum.HOME },
      {
        element: (
          <GameProvier>
            <GamePage />
          </GameProvier>
        ),
        path: RoutesEnum.GAME,
      },
    ],
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    path: '/',
  },
])
