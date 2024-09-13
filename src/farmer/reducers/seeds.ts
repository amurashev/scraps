import { Action, State } from '../types'

function seedsReducer(state: State['seeds'], action: Action): State['seeds'] {
  switch (action.type) {
    case 'plantSeed': {
      return {
        ...state,
        [action.id]: state[action.id] - 1,
      }
    }
    default: {
      return {
        ...state,
      }
    }
  }

  throw Error(`Unknown action: ${action.type}`)
}

export default seedsReducer
