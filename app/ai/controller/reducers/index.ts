import { Action, State } from '../../types'

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'addMessage': {
      return { ...state, data: [...state.data, action.payload] }
    }
    case 'updateMessage': {
      return {
        ...state,
        data: state.data.map((item) =>
          item.id === action.id ? action.payload : item
        ),
      }
    }
  
    default: {
      return state
    }
  }

  throw Error(`Unknown action: ${action.type}`)
}

export default reducer
