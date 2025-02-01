import { useEffect, useState } from 'react'

export const useWindowWidth = () => {
  const breakpoint = 1024

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= breakpoint)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)

  useEffect(() => {
    const onResize = () => {
      setIsDesktop(window.innerWidth >= breakpoint)
      setWindowWidth(window.innerWidth)
      setWindowHeight(window.innerHeight)
    }

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return { isDesktop, setWindowWidth, windowWidth, windowHeight }
}
