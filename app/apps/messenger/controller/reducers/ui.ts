import { Action, State } from '../../types'

function uiReducer(state: State['ui'], action: Action): State['ui'] {
  switch (action.type) {
    case 'toggleDetailsBlock': {
      return {
        ...state,
        hasDetailsBlock: !state.hasDetailsBlock,
      }
    }
    case 'hideDetailsBlock': {
      return {
        ...state,
        hasDetailsBlock: false,
      }
    }
    case 'changeMobileScreen': {
      return {
        ...state,
        mobileScreen: action.screen,
      }
    }
    default: {
      return state
    }
  }
}

export default uiReducer
