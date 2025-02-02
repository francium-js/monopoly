import { PropsWithChildren, useMemo } from 'react'
import { GameContext } from 'src/contexts'
import type { GameContextT } from 'src/contexts/game-provider/types'
import { CubeTemplate } from 'src/entities/cube'
import Modals from 'src/features/modals'

const GameProvier = ({ children }: PropsWithChildren): JSX.Element => {
  // const roadMap
  const angleCardParams = useMemo(() => new CubeTemplate(0.5, 0.05), [])

  const cardParams = useMemo(
    () => new CubeTemplate(0.3, 0.05, angleCardParams.width),
    [angleCardParams.width],
  )

  const mainBoardParams = useMemo(
    () => new CubeTemplate(angleCardParams.width * 2 + cardParams.width * 9, 0.06),
    [cardParams.width, angleCardParams.width],
  )

  const angleCardPositions: Record<number, [number, number, number]> =
    useMemo(() => {
      return {
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
    }, [
      mainBoardParams.halfWidth,
      mainBoardParams.halfHeight,
      angleCardParams.halfWidth,
      angleCardParams.halfHeight,
    ])

  const providerValue: GameContextT = useMemo(
    () => ({
      angleCardParams,
      cardParams,
      mainBoardParams,
      angleCardPositions,
    }),
    [angleCardParams, cardParams, mainBoardParams, angleCardPositions],
  )

  return (
    <GameContext.Provider value={providerValue}>
      {children} <Modals />
    </GameContext.Provider>
  )
}

export default GameProvier
