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
  selectedConversationId?: string
  conversations: Conversation[]
}

export type Action = { type: 'setActiveConversation'; id: string }
