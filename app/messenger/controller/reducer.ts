import { Action, State } from '../types'

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setActiveConversation': {
      return { ...state, selectedConversationId: action.id }
    }
    case 'toggleDetailsBlock': {
      return {
        ...state,
        ui: {
          ...state.ui,
          hasDetailsBlock: !state.ui.hasDetailsBlock,
        },
      }
    }
    case 'hideDetailsBlock': {
      return {
        ...state,
        ui: {
          ...state.ui,
          hasDetailsBlock: false,
        },
      }
    }
    case 'changeMobileScreen': {
      return {
        ...state,
        ui: {
          ...state.ui,
          mobileScreen: action.screen,
        },
      }
    }
    default: {
      return state
    }
  }

  throw Error(`Unknown action: ${action.type}`)
}

export default reducer
