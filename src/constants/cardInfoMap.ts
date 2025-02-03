import { CardSideEnum } from 'src/enums'
import { CardInfoMapT } from 'src/types'

export const cardInfoMap: Record<CardSideEnum, CardInfoMapT[]> = {
  [CardSideEnum.NORTH]: [
    { color: '#ED1B24' },
    {},
    { color: '#ED1B24' },
    { color: '#ED1B24' },
    {},
    { color: '#FEF200' },
    { color: '#FEF200' },
    {},
    { color: '#FEF200' },
  ],
  [CardSideEnum.EAST]: [
    { color: '#1DB459' },
    { color: '#1DB459' },
    {},
    { color: '#1DB459' },
    {},
    {},
    { color: '#0072BB' },
    {},
    { color: '#0072BB' },
  ],
  [CardSideEnum.SOUTH]: [
    { color: '#955436' },
    {},
    { color: '#955436' },
    {},
    {},
    { color: '#AAE0FA' },
    { color: '#AAE0FA' },
    {},
    { color: '#AAE0FA' },
  ],
  [CardSideEnum.WEST]: [
    { color: '#D93A96' },
    {},
    { color: '#D93A96' },
    { color: '#D93A96' },
    {},
    { color: '#F7941D' },
    {},
    { color: '#F7941D' },
    { color: '#F7941D' },
  ],
}
