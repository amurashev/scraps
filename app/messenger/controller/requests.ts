import { sleep } from '@/lib/utils'

import conversations from '../data/conversations.json'
import users from '../data/users.json'

import { Conversation, Message } from '../types'

export const getConversations = async (): Promise<Conversation[]> => {
  await sleep(1000)

  return conversations.map((conversation) => {
    return {
      ...conversation,
      lastMessage: {
        ...conversation.lastMessage,
        type: conversation.lastMessage.type as Message['type'],
      },
      user: {
        ...users[conversation.userId as keyof typeof users],
        id: conversation.userId,
      },
    }
  })
}

export const getMessages = async (
  conversationId: string
): Promise<Message[]> => {
  await sleep(1500)

  const conversation = conversations.find((item) => item.id === conversationId)

  return [conversation?.lastMessage as Message]
}
