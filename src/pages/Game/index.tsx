import { useGamePage } from 'src/pages/Game/useGamePage'

const HomePage = (): JSX.Element => {
  const { mountRef } = useGamePage()
  return (
    <div>
      <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />
    </div>
  )
}

export default HomePage
