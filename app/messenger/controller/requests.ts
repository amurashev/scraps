import { sleep } from '@/lib/utils'

import conversations from '../data/conversations.json'
import users from '../data/users.json'
import messages from '../data/messages.json'

import { Conversation, Message } from '../types'

export const getConversations = async (): Promise<Conversation[]> => {
  await sleep(1000)

  return conversations
    .map((conversation) => {
      const conversationMessages = messages.filter(
        (item) => item.conversationId === conversation.id
      )
      const lastMessage = conversationMessages.length
        ? conversationMessages[conversationMessages.length - 1]
        : undefined
      const user = users[conversation.userId as keyof typeof users]

      const updatedLestMessage = lastMessage
        ? {
            ...lastMessage,
            type: lastMessage.type as Message['type'],
            sender: users[lastMessage.senderId as keyof typeof users],
          }
        : undefined

      return {
        ...conversation,
        lastMessage: updatedLestMessage as Message, // Because we filter it anyway
        user,
      }
    })
    .filter((item) => item.lastMessage)
}

export const getMessages = async (
  conversationId: string
): Promise<Message[]> => {
  await sleep(1500)

  return messages
    .filter((item) => item.conversationId === conversationId)
    .map((item) => {
      const sender = users[item?.senderId as keyof typeof users]
      return {
        ...item,
        sender,
      } as Message
    })
}

export const sendMessage = async ({
  text,
  senderId,
}: {
  text: string
  senderId: string
}): Promise<Message> => {
  await sleep(500)

  return {
    id: `5`,
    date: '2024-08-12T16:15:53+02:00',
    text: text,
    type: 'text',
    senderId,
    sender: users[senderId as keyof typeof users],
    deliveredTo: [],
    readBy: [],
  }
}
