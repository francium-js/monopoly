import { useRef } from 'react'
import * as THREE from 'three'

const LightsModel = () => {
  const pointLightModelRef = useRef<THREE.PointLight>(null)

  return (
    <>
      <ambientLight color={0x111111} intensity={0.2} />

      <pointLight
        ref={pointLightModelRef}
        position={[0, 2, 0]}
        intensity={1.5}
        distance={5}
        castShadow
        color={0xffffff}
        shadow-mapSize-width={1028}
        shadow-mapSize-height={1028}
      />
    </>
  )
}

export default LightsModel
