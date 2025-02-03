import { useGame } from 'src/contexts/game-provider/useGame'
import { CardSideEnum } from 'src/enums'

export const useGamePage = () => {
  const { mainBoardParams, angleCardPositions, cardParams } = useGame()
  const cardHeight = mainBoardParams.halfHeight + cardParams.halfHeight

  const groupCardPositionMap: Record<
    CardSideEnum,
    { position: [number, number, number]; rotation: [number, number, number] }
  > = {
    [CardSideEnum.NORTH]: {
      position: [0, cardHeight, mainBoardParams.halfWidth - cardParams.halfLength],
      rotation: [0, 0, 0],
    },
    [CardSideEnum.EAST]: {
      position: [
        -mainBoardParams.halfWidth + cardParams.halfLength,
        cardHeight,
        mainBoardParams.halfWidth / 2 - mainBoardParams.halfWidth / 2,
      ],
      rotation: [0, -Math.PI / 2, 0],
    },
    [CardSideEnum.SOUTH]: {
      position: [0, cardHeight, -mainBoardParams.halfWidth + cardParams.halfLength],
      rotation: [0, -Math.PI / 1, 0],
    },
    [CardSideEnum.WEST]: {
      position: [
        mainBoardParams.halfWidth - cardParams.halfLength,
        cardHeight,
        mainBoardParams.halfWidth / 2 - mainBoardParams.halfWidth / 2,
      ],
      rotation: [0, -Math.PI / -2, 0],
    },
  }

  return { angleCardPositions, groupCardPositionMap }
}
