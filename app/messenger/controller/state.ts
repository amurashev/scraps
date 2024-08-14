import { State } from '../types'

const defaultState: State = {
  selectedConversationId: undefined,
  ui: {
    hasDetailsBlock: false,
    mobileScreen: 'list',
  },
  conversations: {
    data: [],
    areFetched: false,
  },
  messages: {
    data: [],
    areFetched: false,
  },
}

export default defaultState
