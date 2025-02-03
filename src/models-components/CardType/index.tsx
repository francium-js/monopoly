import { useRef, useEffect } from 'react'
import { useGame } from 'src/contexts/game-provider/useGame'
import { CardTypeModelProps } from 'src/models-components/CardType/types'
import * as THREE from 'three'
import gsap from 'gsap'

const CardTypeModel = ({ color, isHovered }: CardTypeModelProps) => {
  const CardTypeModelRef = useRef<THREE.Mesh>(null)
  const lightRef = useRef<THREE.PointLight>(null)
  const { cardParams } = useGame()

  useEffect(() => {
    if (CardTypeModelRef.current && lightRef.current) {
      gsap.to(CardTypeModelRef.current.material, {
        emissiveIntensity: isHovered ? 3 : 0.5,
        duration: 0.3,
        ease: 'power1.out',
      })

      gsap.to(lightRef.current, {
        intensity: isHovered ? 0.25 : 0,
        duration: 0.3,
        ease: 'power1.out',
      })
    }
  }, [isHovered])

  return (
    <group position={[0, cardParams.halfHeight, -0.2]}>
      <mesh ref={CardTypeModelRef} castShadow>
        <boxGeometry args={[cardParams.width * 0.8, 0.01, 0.025]} />
        <meshStandardMaterial color={color} emissive={color} roughness={0.2} />
      </mesh>

      <pointLight
        ref={lightRef}
        position={[0, 1.5, 0]}
        intensity={0.05}
        color={color}
      />
    </group>
  )
}

export default CardTypeModel
