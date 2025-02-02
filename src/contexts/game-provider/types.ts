import { CubeTemplate } from 'src/entities/cube'

export type GameContextT = {
  angleCardParams: CubeTemplate
  cardParams: CubeTemplate
  mainBoardParams: CubeTemplate
  angleCardPositions: Record<number, [number, number, number]>
}
