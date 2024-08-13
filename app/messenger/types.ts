export type Conversation = {
  id: string
  user: {
    id: string
    firstName: string
    lastName: string
    isOnline: boolean
    lastOnlineDate: string
    avatarUrl: string
  }
  unreadCount: number
  body: {
    date: string
    text: string
    status: 'unread' | 'read' | 'delivered'
  }
  senderId: string
  deliveredTo: string[]
  readBy: string[]
}

export type State = {
  ui: {
    hasDetailsBlock: boolean
    mobileScreen: 'list' | 'chat' | 'details'
  }
  selectedConversationId?: string
  conversations: Conversation[]
}

export type Action =
  | { type: 'setActiveConversation'; id: string | undefined }
  | { type: 'toggleDetailsBlock' }
  | { type: 'changeMobileScreen', screen: State['ui']['mobileScreen'] }
