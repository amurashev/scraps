import users from '../data/users.json'

import { Message } from '../types'

export const getTempMessage = ({
  text,
  senderId,
}: {
  text: string
  senderId: string
}): Message => {
  return {
    id: `temp_${Date.now()}_${senderId}`,
    date: '2024-08-12T16:15:53+02:00',
    text,
    type: 'text',
    senderId,
    sender: users[senderId as keyof typeof users],
    deliveredTo: [],
    readBy: [],
  }
}
