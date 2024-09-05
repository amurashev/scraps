import { Action, State } from '../types'

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'changeDate': {
      return { ...state, birthday: action.value }
    }
    case 'changeLifeCycle': {
      return { ...state, lifeCycle: action.value }
    }
    case 'changeActiveCycle': {
      return { ...state, activeCycle: action.value }
    }

    default: {
      return state
    }
  }

  throw Error(`Unknown action: ${action.type}`)
}

export default reducer
