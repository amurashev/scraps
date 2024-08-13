'use client'

import { Input } from '@/components/ui/input'

import ConversationCard from './conversationCard'

import { State } from '../types'

const SideBar = ({
  conversations,
  onConversationClick,
}: {
  conversations: State['conversations']
  onConversationClick: (id: string) => void
}) => {
  return (
    <>
      <div className="p-4 px-6 space-y-6">
        <h2 className="font-bold text-2xl">Messages</h2>
        <Input placeholder="Search" />
      </div>
      <div>
        {conversations.map((item) => {
          return (
            <div key={item.id} onClick={() => onConversationClick(item.id)}>
              <ConversationCard
                firstName={item.user.firstName}
                lastName={item.user.lastName}
                avatarUrl={item.user.avatarUrl}
                textMessage={item.body.text}
                date={item.body.date}
              />
            </div>
          )
        })}
      </div>
    </>
  )
}

export default SideBar
