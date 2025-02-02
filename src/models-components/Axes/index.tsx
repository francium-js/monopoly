import { useThree } from '@react-three/fiber'
import { AxesHelper } from 'three'
import { useEffect } from 'react'

const AxesModel = () => {
  const { scene } = useThree()

  useEffect((): (() => void) => {
    const axesHelper = new AxesHelper(2) // 2 - розмір осей
    axesHelper.position.set(0, 1, 0)
    scene.add(axesHelper)

    return () => scene.remove(axesHelper)
  }, [scene])

  return null
}

export default AxesModel
