import { RoundedBox } from '@react-three/drei'
import { useRef } from 'react'
import { useGame } from 'src/contexts/game-provider/useGame'
import * as THREE from 'three'

const GameBoardModel = () => {
  const gameBoardModelRef = useRef<THREE.Mesh>(null)
  const { mainBoardParams } = useGame()

  return (
    <>
      <mesh ref={gameBoardModelRef} position={[0, 0, 0]} castShadow>
        <RoundedBox
          args={[
            mainBoardParams.width + 0.2,
            mainBoardParams.height,
            mainBoardParams.length + 0.2,
          ]}
          radius={0.01}
          smoothness={10}
        >
          <meshStandardMaterial color={`rgb($200,200,200)`} roughness={0.6} />
        </RoundedBox>
      </mesh>
    </>
  )
}

export default GameBoardModel
