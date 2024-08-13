type User = {
  id: string
  firstName: string
  lastName: string
  isOnline: boolean
  lastOnlineDate: string
  avatarUrl: string
}

export type Message = {
  id: string
  date: string
  text: string
  type: 'text'
  senderId: string
  deliveredTo: string[]
  readBy: string[]
  sender: User
}

export type Conversation = {
  id: string
  user: User
  unreadCount: number
  lastMessage: Message
}

export type State = {
  selectedConversationId?: string
  ui: {
    hasDetailsBlock: boolean
    mobileScreen: 'list' | 'chat' | 'details'
  }
  conversations: {
    data: Conversation[]
    areFetched: boolean
  }
  messages: {
    data: Message[]
    areFetched: boolean
  }
}

export type Action =
  | { type: 'setActiveConversation'; id: string | undefined }
  // Ui
  | { type: 'toggleDetailsBlock' }
  | { type: 'hideDetailsBlock' }
  | { type: 'changeMobileScreen'; screen: State['ui']['mobileScreen'] }
  // Conversations
  | { type: 'setInitialConversationFetchStatus'; value: boolean }
  | { type: 'addConversations'; payload: Conversation[] }
  // Messages
  | { type: 'setMessagesFetchStatus'; value: boolean }
  | { type: 'addMessages'; payload: Message[] }
  | { type: 'addMessage'; payload: Message }
  | { type: 'updateMessage'; payload: Message, id: string }
