import { Action, State } from '../types'

function gridReducer(state: State['grid'], action: Action): State['grid'] {
  switch (action.type) {
    case 'plantSeed': {
      return {
        ...state,
        [action.point]: {
          itemId: action.id,
        },
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

export default gridReducer
