import { useRef, useState } from 'react'
import { useGame } from 'src/contexts/game-provider/useGame'
import { AngleCardModelProps } from 'src/models-components/AngleCard/types'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ThreeEvent } from '@react-three/fiber'

const AngleCardModel = ({ index }: AngleCardModelProps) => {
  const angleCardModelRef = useRef<THREE.Mesh>(null)
  const { angleCardParams } = useGame()
  const [isHovered, setIsHovered] = useState(false)

  const handlePointerEnter = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    setIsHovered(true)
    document.body.style.cursor = 'pointer'

    if (angleCardModelRef.current) {
      gsap.to(angleCardModelRef.current.position, {
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

    if (angleCardModelRef.current) {
      gsap.to(angleCardModelRef.current.position, {
        y: 0,
        duration: 0.2,
        ease: 'power1.out',
      })
    }
  }

  return (
    <mesh
      onPointerOver={handlePointerEnter}
      onPointerOut={handlePointerLeave}
      ref={angleCardModelRef}
      position={[0, 0, 0]}
      castShadow
    >
      <RoundedBox
        args={[
          angleCardParams.width,
          angleCardParams.height,
          angleCardParams.length,
        ]}
        radius={0.01}
        smoothness={10}
      >
        <meshStandardMaterial
          color={
            isHovered
              ? 'rgb(200,200,200)'
              : `rgb(${index * 20 + 120},${index * 20 + 120},${index * 20 + 120})`
          }
          roughness={0.6}
        />
      </RoundedBox>
    </mesh>
  )
}

export default AngleCardModel
