import { useRef, useState } from 'react'
import { useGame } from 'src/contexts/game-provider/useGame'
import { CardModelProps } from 'src/models-components/Card/types'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'

const CardModel = ({ index }: CardModelProps) => {
  const CardModelRef = useRef<THREE.Mesh>(null)
  const { cardParams, mainBoardParams, angleCardParams } = useGame()
  const [isHovered, setIsHovered] = useState(false)

  const handlePointerOver = () => {
    setIsHovered(true)
    document.body.style.cursor = 'pointer'

    if (CardModelRef.current) {
      gsap.to(CardModelRef.current.position, {
        y: 0.05,
        duration: 0.2,
        ease: 'power1.out',
      })
    }
  }

  const handlePointerOut = () => {
    setIsHovered(false)
    document.body.style.cursor = 'default'

    if (CardModelRef.current) {
      gsap.to(CardModelRef.current.position, {
        y: 0,
        duration: 0.2,
        ease: 'power1.out',
      })
    }
  }

  return (
    <mesh
      ref={CardModelRef}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      castShadow
      position={[
        -(
          -mainBoardParams.halfWidth +
          angleCardParams.width +
          cardParams.halfWidth +
          index * cardParams.width
        ),
        0,
        0,
      ]}
    >
      <RoundedBox
        args={[cardParams.width, cardParams.height, cardParams.length]}
        radius={0.01}
        smoothness={10}
      >
        <meshStandardMaterial
          color={
            isHovered
              ? 'lightblue'
              : `rgb(${index * 15 + 100},${index * 15 + 100},${index * 15 + 100})`
          }
          roughness={0.6}
        />
      </RoundedBox>
    </mesh>
  )
}

export default CardModel
