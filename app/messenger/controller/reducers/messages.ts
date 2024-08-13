import { Action, State } from '../../types'

function conversationsReducer(
  state: State['messages'],
  action: Action
): State['messages'] {
  switch (action.type) {
    case 'setMessagesFetchStatus': {
      return {
        ...state,
        areFetched: action.value,
      }
    }

    case 'addMessages': {
      return { ...state, data: action.payload }
    }

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
}

export default conversationsReducer
