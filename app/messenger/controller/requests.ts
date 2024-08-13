import { sleep } from '@/lib/utils'

import conversations from '../data/conversations.json'
import users from '../data/users.json'

import { Conversation, Message } from '../types'

export const getConversations = async (): Promise<Conversation[]> => {
  await sleep(1000)

  return conversations.map((conversation) => {
    const lastMessage = conversation.lastMessage
    const sender = users[lastMessage.senderId as keyof typeof users]
    const user = users[conversation.userId as keyof typeof users]

    return {
      ...conversation,
      lastMessage: {
        ...lastMessage,
        type: lastMessage.type as Message['type'],
        sender,
      },
      user,
    }
  })
}

export const getMessages = async (
  conversationId: string
): Promise<Message[]> => {
  await sleep(1500)

  const conversation = conversations.find((item) => item.id === conversationId)
  const lastMessage = conversation?.lastMessage
  const sender = users[lastMessage?.senderId as keyof typeof users]

  const message = {
    ...conversation?.lastMessage,
    sender,
  } as Message

  return [
    {
      id: '2',
      date: '2024-08-12T16:15:53+02:00',
      text: 'Have a nice week bro!',
      type: 'text',
      senderId: '2',
      sender: users['2'],
      deliveredTo: [],
      readBy: [],
    },
    message,
  ]
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
