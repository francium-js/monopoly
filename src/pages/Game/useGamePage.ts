import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { CubeTemplate } from 'src/entities/cube'
import { useWindowWidth } from 'src/hooks/use-window-width'
// import { GLTFLoader } from 'three/examples/jsm/Addons.js'

const angleCardParams = new CubeTemplate(0.5, 0.06)

const cardParams = new CubeTemplate(0.3, 0.05, angleCardParams.width)

const mainBoardParams = new CubeTemplate(
  angleCardParams.width * 2 + cardParams.width * 9,
  0.06,
)

const angleCardPositions: Record<number, [number, number, number]> = {
  0: [
    mainBoardParams.halfWidth - angleCardParams.halfWidth,
    mainBoardParams.halfHeight + angleCardParams.halfHeight,
    mainBoardParams.halfWidth - angleCardParams.halfWidth,
  ],
  1: [
    -(mainBoardParams.halfWidth - angleCardParams.halfWidth),
    mainBoardParams.halfHeight + angleCardParams.halfHeight,
    mainBoardParams.halfWidth - angleCardParams.halfWidth,
  ],
  2: [
    mainBoardParams.halfWidth - angleCardParams.halfWidth,
    mainBoardParams.halfHeight + angleCardParams.halfHeight,
    -(mainBoardParams.halfWidth - angleCardParams.halfWidth),
  ],
  3: [
    -(mainBoardParams.halfWidth - angleCardParams.halfWidth),
    mainBoardParams.halfHeight + angleCardParams.halfHeight,
    -(mainBoardParams.halfWidth - angleCardParams.halfWidth),
  ],
}

const cardTemplateArray = () => {
  const { width, height, length } = cardParams

  return Array.from(
    { length: 9 },
    (_, i) =>
      new THREE.Mesh(
        new RoundedBoxGeometry(width, height, length, 10, 0.01),
        new THREE.MeshStandardMaterial({
          color: `rgb(${i * 15 + 50},${i * 15 + 50},${i * 15 + 50})`,
          roughness: 0.6,
        }),
      ),
  )
}

export const useGamePage = () => {
  const mountRef = useRef<HTMLDivElement | null>(null)

  const { windowWidth, windowHeight } = useWindowWidth()

  useEffect(() => {
    const width = windowWidth
    const height = Math.max(windowHeight, 480)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.shadowMap.enabled = true
    renderer.setSize(width, height)
    renderer.setClearColor(0x0a0a0a)
    renderer.setPixelRatio(2)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10)
    const orbit = new OrbitControls(camera, renderer.domElement)

    camera.position.set(0, 2, 4)

    orbit.minPolarAngle = 0
    orbit.maxPolarAngle = Math.PI / 2 - 0.1
    orbit.rotateSpeed = 0.2
    orbit.enablePan = false
    orbit.enableZoom = true
    orbit.maxDistance = 5
    orbit.minDistance = 2
    orbit.update()

    if (!mountRef.current) return

    const pointLight = new THREE.PointLight(0xffffff, 2, 5)

    pointLight.position.set(0, 2, 0)
    pointLight.castShadow = true
    pointLight.shadow.mapSize.width = 2
    pointLight.shadow.mapSize.height = 2

    scene.add(pointLight)

    const ambientLight = new THREE.AmbientLight(0x111111, 0.2)
    scene.add(ambientLight)

    const lightHelper = new THREE.PointLightHelper(pointLight, 0.2)
    scene.add(lightHelper)

    mountRef.current.appendChild(renderer.domElement)

    const monopoly = new THREE.Group()
    monopoly.castShadow = true

    const rotatedGroupCard = () => new THREE.Group()

    const mainboard = new THREE.Mesh(
      new RoundedBoxGeometry(
        mainBoardParams.width + 0.2,
        mainBoardParams.height,
        mainBoardParams.length + 0.2,
        10,
        0.01,
      ),
      new THREE.MeshStandardMaterial({
        color: 'rgb(200,200,200)',
        roughness: 0.6,
      }),
    )

    const startTopPositions = (i: number): [number, number, number] => [
      -mainBoardParams.halfWidth +
        angleCardParams.width +
        cardParams.halfWidth +
        i * cardParams.width,
      mainBoardParams.halfHeight + cardParams.halfHeight,
      -mainBoardParams.halfWidth + cardParams.halfLength,
    ]

    const northCardTemplateArray = cardTemplateArray().map((card, i) => {
      card.position.set(...startTopPositions(i))
      card.name = 'north-card'
      card.castShadow = true
      return card
    })

    const eastCardTemplateArray = cardTemplateArray().map((card, i) => {
      card.position.set(...startTopPositions(i))
      card.name = 'east-card'
      card.castShadow = true
      return card
    })

    const rotatedEastCardTemplateArray = rotatedGroupCard()

    eastCardTemplateArray.forEach(card => {
      rotatedEastCardTemplateArray.add(card)
    })

    rotatedEastCardTemplateArray.rotation.set(0, -Math.PI / 2, 0)

    const startBottomPositions = (i: number): [number, number, number] => [
      mainBoardParams.halfWidth -
        angleCardParams.width -
        cardParams.halfWidth -
        i * cardParams.width,
      mainBoardParams.halfHeight + cardParams.halfHeight,
      mainBoardParams.halfWidth - cardParams.halfLength,
    ]

    const southCardTemplateArray = cardTemplateArray().map((card, i) => {
      card.position.set(...startBottomPositions(i))
      card.name = 'south-card'
      card.castShadow = true
      return card
    })

    const westCardTemplateArray = cardTemplateArray().map((card, i) => {
      card.position.set(...startBottomPositions(i))
      card.name = 'west-card'
      card.castShadow = true
      return card
    })

    const rotatedWestCardTemplateArray = rotatedGroupCard()

    westCardTemplateArray.forEach(card => {
      rotatedWestCardTemplateArray.add(card)
    })

    rotatedWestCardTemplateArray.rotation.set(0, -Math.PI / 2, 0)

    const angleCardTemplateArray = Object.values(angleCardPositions).map(
      position => {
        const angleCardTemplate = new THREE.Mesh(
          new RoundedBoxGeometry(
            angleCardParams.width,
            angleCardParams.height,
            angleCardParams.length,
            10,
            0.01,
          ),
          new THREE.MeshStandardMaterial({ roughness: 0.2 }),
        )

        angleCardTemplate.position.set(...position)

        return angleCardTemplate
      },
    )

    mainboard.receiveShadow = true

    monopoly.add(mainboard)

    angleCardTemplateArray.forEach(angleCardTemplate => {
      monopoly.add(angleCardTemplate)
    })

    northCardTemplateArray.forEach(card => {
      monopoly.add(card)
    })

    monopoly.add(rotatedEastCardTemplateArray)

    southCardTemplateArray.forEach(card => {
      monopoly.add(card)
    })

    monopoly.add(rotatedWestCardTemplateArray)

    monopoly.position.set(0, 0, 0)

    // const loader = new GLTFLoader()
    // loader.load('src/models/cybercity.glb', gltf => {
    //   const model = gltf.scene

    //   const box = new THREE.Box3().setFromObject(model)

    //   const size = box.getSize(new THREE.Vector3())

    //   console.log(size)

    //   const x = angleCardParams.width * 2 + (cardParams.width * 9) / size.x
    //   const y = 0.06 / size.y
    //   const z = angleCardParams.width * 2 + (cardParams.width * 9) / size.z

    //   const scaleX = Math.max(Math.round(x * 1000) / 1000, 0.001)
    //   const scaleY = Math.max(Math.round(y * 1000) / 1000, 0.001)
    //   const scaleZ = Math.max(Math.round(z * 1000) / 1000, 0.001)

    //   console.log({ scaleX, scaleY, scaleZ })

    //   model.scale.set(scaleX, scaleY, scaleZ)

    //   model.scale.set(0.0000265, 0.000043, 0.0000265)
    //   model.position.set(0.025, 0.04, 0)
    //   model.castShadow = true
    //   model.receiveShadow = true

    //   scene.add(model)
    // })

    scene.add(monopoly)

    const animate = () => {
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      renderer.dispose()
    }
  }, [windowWidth, windowHeight])
  return { mountRef }
}
