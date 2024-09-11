import { Action, State } from '../types'

function uiReducer(state: State['ui'], action: Action): State['ui'] {
  switch (action.type) {
    case 'setApplyModalOpen': {
      return { ...state, isApplyModalOpen: action.value }
    }
    default: {
      return state
    }
  }
}

export default uiReducer
