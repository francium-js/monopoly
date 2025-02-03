import { FontLoader } from 'three-stdlib'
import { useLoader } from '@react-three/fiber'

export const useFont = (src: string) => {
  return useLoader(FontLoader, src)
}
