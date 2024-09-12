import { State } from './types'

const defaultState: State = {
  money: 50,
  grid: {
    '0,0': {
      itemId: '1',
    },
    '0,1': {
      itemId: '2',
    },
    // '1,1': {
    //   itemId: '3',
    // },
    // '2,1': {
    //   itemId: '4',
    // },
  },
}

export default defaultState
