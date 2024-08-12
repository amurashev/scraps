import { Conversation, State } from '../types'

import conversations from '../data/conversations.json'

const defaultState: State = {
  selectedConversationId: undefined,
  conversations: conversations as Conversation[],
}

export default defaultState
