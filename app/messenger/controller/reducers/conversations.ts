import { Action, State } from '../../types'

function conversationsReducer(
  state: State['conversations'],
  action: Action
): State['conversations'] {
  switch (action.type) {
    case 'setInitialConversationFetchStatus': {
      return {
        ...state,
        areFetched: action.value,
      }
    }

    case 'addConversations': {
      return { ...state, data: action.payload }
    }

    default: {
      return state
    }
  }
}

export default conversationsReducer
