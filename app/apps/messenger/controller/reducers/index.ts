import { Action, State } from '../../types'

import uiReducer from './ui'
import messagesReducer from './messages'
import conversationsReducer from './conversations'

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setActiveConversation': {
      return { ...state, selectedConversationId: action.id }
    }

    default: {
      return {
        ...state,
        ui: uiReducer(state.ui, action),
        messages: messagesReducer(state.messages, action),
        conversations: conversationsReducer(state.conversations, action),
      }
    }
  }

  throw Error(`Unknown action: ${action.type}`)
}

export default reducer
