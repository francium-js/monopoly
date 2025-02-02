import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Lights from 'src/models-components/Lights'
import GameBoard from 'src/models-components/GameBoard'
import CardModel from 'src/models-components/Card'
import { useGame } from 'src/contexts/game-provider/useGame'
import { CardSideEnum } from 'src/enums'
import AngleCardModel from 'src/models-components/AngleCard'
import AxesModel from 'src/models-components/Axes'

const HomePage = (): JSX.Element => {
  const { mainBoardParams, angleCardPositions, cardParams } = useGame()
  const cardHeight = mainBoardParams.halfHeight + cardParams.halfHeight
  return (
    <Canvas
      gl={{
        antialias: true,
        pixelRatio: Math.min(window.devicePixelRatio, 2),
      }}
      style={{ width: '100vw', height: '100vh' }}
      camera={{ position: [0, 2, -8], fov: 70 }}
    >
      <color attach="background" args={['rgb(100,100,100)']} />

      <Lights />

      <AxesModel />

      <OrbitControls
        enableZoom={true}
        enablePan={false}
        rotateSpeed={0.2}
        maxDistance={5}
        minDistance={2}
        maxPolarAngle={Math.PI / 2 + 0.5}
        minAzimuthAngle={0}
      />

      <GameBoard />

      {Array.from({ length: 4 }).map((_, i) => (
        <group position={angleCardPositions[i]}>
          <AngleCardModel key={i + 'angle-card'} index={i} />
        </group>
      ))}

      {/* TOP */}
      <group
        position={[0, cardHeight, mainBoardParams.halfWidth - cardParams.halfLength]}
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <CardModel key={CardSideEnum.NORTH + i} index={i} />
        ))}
      </group>

      {/* BOTTOM */}
      <group
        position={[
          0,
          cardHeight,
          -mainBoardParams.halfWidth + cardParams.halfLength,
        ]}
        rotation={[0, -Math.PI / 1, 0]}
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <CardModel key={CardSideEnum.SOUTH + i} index={i} />
        ))}
      </group>

      {/* RIGHT */}
      <group
        position={[
          -mainBoardParams.halfWidth + cardParams.halfLength,
          cardHeight,
          mainBoardParams.halfWidth / 2 - mainBoardParams.halfWidth / 2,
        ]}
        rotation={[0, -Math.PI / 2, 0]}
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <CardModel key={CardSideEnum.EAST + i} index={i} />
        ))}
      </group>

      {/* LEFT */}
      <group
        position={[
          mainBoardParams.halfWidth - cardParams.halfLength,
          cardHeight,
          mainBoardParams.halfWidth / 2 - mainBoardParams.halfWidth / 2,
        ]}
        rotation={[0, -Math.PI / -2, 0]}
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <CardModel key={CardSideEnum.EAST + i} index={i} />
        ))}
      </group>
    </Canvas>
  )
}

export default HomePage
