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

    default: {
      return state
    }
  }
}

export default conversationsReducer
