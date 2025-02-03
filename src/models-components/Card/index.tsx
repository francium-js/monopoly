import { useRef, useState } from 'react'
import { useGame } from 'src/contexts/game-provider/useGame'
import { CardModelProps } from 'src/models-components/Card/types'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import CardTypeModel from 'src/models-components/CardType'
import { ThreeEvent } from '@react-three/fiber'
import HologramText from '../HologramText'

const CardModel = ({ index, cardInfo }: CardModelProps) => {
  const CardModelRef = useRef<THREE.Mesh>(null)
  const { cardParams, mainBoardParams, angleCardParams } = useGame()
  const [isHovered, setIsHovered] = useState(false)

  const handlePointerEnter = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    setIsHovered(true)
    document.body.style.cursor = 'pointer'

    if (CardModelRef.current) {
      gsap.to(CardModelRef.current.position, {
        y: 0.025,
        duration: 0.2,
        ease: 'power1.out',
      })
    }
  }

  const handlePointerLeave = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
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
    <group
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
      <mesh
        ref={CardModelRef}
        onPointerOver={handlePointerEnter}
        onPointerOut={handlePointerLeave}
        castShadow
      >
        <RoundedBox
          args={[cardParams.width, cardParams.height, cardParams.length]}
          radius={0.008}
          smoothness={10}
        >
          <meshStandardMaterial
            color={isHovered ? 'rgb(220,220,220)' : `rgb(200,200,200)`}
            roughness={0.6}
          />
          {cardInfo.color && (
            <CardTypeModel isHovered={isHovered} color={cardInfo.color} />
          )}

          {/* <Text
            position={[0, cardParams.halfHeight + 0.01, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={0.03}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {12312}
          </Text> */}
        </RoundedBox>
      </mesh>
      <HologramText text={'123'} />
    </group>
  )
}

export default CardModel
