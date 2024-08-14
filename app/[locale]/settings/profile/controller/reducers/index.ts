import { Action, State } from '../../types'

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'changeName': {
      return { ...state, username: action.value }
    }
    case 'changeEmail': {
      return { ...state, email: action.value }
    }
    default: {
      return state
    }
  }

  throw Error(`Unknown action: ${action.type}`)
}

export default reducer
