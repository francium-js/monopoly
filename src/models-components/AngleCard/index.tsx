import { useRef, useState } from 'react'
import { useGame } from 'src/contexts/game-provider/useGame'
import { AngleCardModelProps } from 'src/models-components/AngleCard/types'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'

const AngleCardModel = ({ index }: AngleCardModelProps) => {
  const angleCardModelRef = useRef<THREE.Mesh>(null)
  const { angleCardParams } = useGame()
  const [isHovered, setIsHovered] = useState(false)

  const handlePointerOver = () => {
    setIsHovered(true)
    document.body.style.cursor = 'pointer'

    if (angleCardModelRef.current) {
      gsap.to(angleCardModelRef.current.position, {
        y: 0.05,
        duration: 0.2,
        ease: 'power1.out',
      })
    }
  }

  const handlePointerOut = () => {
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
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
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
              ? 'lightblue'
              : `rgb(${index * 20 + 120},${index * 20 + 120},${index * 20 + 120})`
          }
          roughness={0.6}
        />
      </RoundedBox>
    </mesh>
  )
}

export default AngleCardModel
