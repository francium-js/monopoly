import { extend, Overwrite, useFrame } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { useRef, useMemo, useEffect } from 'react'
import { TextGeometry } from 'three-stdlib'
import { useFont } from 'src/hooks/useFont'
import { HologramTextProps } from 'src/models-components/HologramText/types'
import { useGame } from 'src/contexts/game-provider/useGame'

const GlitchShader = shaderMaterial(
  {
    time: 0,
    seed: Math.random(),
    color: new THREE.Color(`rgb(255, 255, 255)`),
  },
  `
  varying vec2 vUv;
  uniform float time;
  uniform float seed;

  float random(float x) {
    return fract(sin(x) * 43758.5453);
  }

  void main() {
    vUv = uv;
    vec3 pos = position;

    float t = time * 0.5 + seed * 20.0;

    float offset = step(0.9, random(pos.y + t * 0.3)) * (random(t) - 0.5) * 0.015;
    pos.x += offset;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
  `,
  `
  uniform vec3 color;
  uniform float time;
  uniform float seed;
  varying vec2 vUv;

  float random(float x) {
    return fract(sin(x) * 43758.5453);
  }

  void main() {
    float t = time * 0.7 + seed * 10.0;

    // Додаємо випадковість у прозорість
    float localOffset = seed * 4.0; // Використання seed для унікальності
    float alpha = 0.3 + (sin(t * 3.0 + localOffset) * 0.15);
    alpha = clamp(alpha, 0.4, 0.5);

    // Глітчевий ефект на колір
    float glitch = step(0.98, random(t + localOffset));
    vec3 finalColor = mix(color, vec3(1.0), glitch);

    gl_FragColor = vec4(finalColor, alpha);
  }
  `,
)

extend({ GlitchShader })

declare module '@react-three/fiber' {
  interface ThreeElements {
    glitchShader: Overwrite<
      JSX.IntrinsicElements['shaderMaterial'],
      {
        seed?: number
        glitchPattern?: number
      }
    >
  }
}

const HologramText = ({ text, ...props }: HologramTextProps) => {
  const shaderRef = useRef<THREE.ShaderMaterial>(null)
  const meshRef = useRef<THREE.Mesh>(null)

  const { cardParams } = useGame()
  const font = useFont('src/assets/fonts/Tektur_Regular.json')

  const textGeometry = useMemo(() => {
    return new TextGeometry(text, {
      font,
      size: 0.05,
      height: 0.01,
    })
  }, [font, text])

  useFrame(({ clock }) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.time.value = clock.getElapsedTime()
    }
  })

  useEffect(() => {
    if (meshRef.current) {
      textGeometry.computeBoundingBox()
      const boundingBox = textGeometry.boundingBox

      if (boundingBox) {
        const width = boundingBox.max.x - boundingBox.min.x
        meshRef.current.position.x = -width * 0.5
      }
    }
  }, [textGeometry])

  return (
    <mesh
      ref={meshRef}
      geometry={textGeometry}
      {...props}
      position={[0, -0.08, cardParams.halfLength * 1.4]}
    >
      <glitchShader
        seed={Math.random()}
        ref={shaderRef}
        side={THREE.FrontSide}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  )
}

export default HologramText
