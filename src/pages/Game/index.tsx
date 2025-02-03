import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Lights from 'src/models-components/Lights'
import GameBoardModel from 'src/models-components/GameBoard'
import CardModel from 'src/models-components/Card'
import { CardSideEnum } from 'src/enums'
import AngleCardModel from 'src/models-components/AngleCard'
import AxesModel from 'src/models-components/Axes'
import { cardInfoMap } from 'src/constants/cardInfoMap'
import { useGamePage } from 'src/pages/Game/useGamePage'

const GamePage = (): JSX.Element => {
  const { angleCardPositions, groupCardPositionMap } = useGamePage()

  return (
    <Canvas
      gl={{
        antialias: true,
        pixelRatio: Math.min(window.devicePixelRatio, 2),
      }}
      style={{ width: '100vw', height: '100vh' }}
      camera={{ position: [0, 2, -8], fov: 55 }}
    >
      <color attach="background" args={['rgb(38, 38, 38)']} />

      <Lights />

      <AxesModel />

      <OrbitControls
        enableZoom={true}
        enablePan={false}
        rotateSpeed={0.2}
        maxDistance={5}
        minDistance={2.5}
        maxPolarAngle={Math.PI / 2 - 0.2}
        minAzimuthAngle={0}
      />

      <GameBoardModel />

      {Array.from({ length: 4 }).map((_, i) => (
        <group position={angleCardPositions[i]}>
          <AngleCardModel key={i + 'angle-card'} index={i} />
        </group>
      ))}

      {Object.values(CardSideEnum).map(side => (
        <group {...groupCardPositionMap[side]}>
          {Array.from({ length: 9 }).map((_, i) => (
            <CardModel cardInfo={cardInfoMap[side][i]} key={side + i} index={i} />
          ))}
        </group>
      ))}
    </Canvas>
  )
}

export default GamePage
