'use client'

import { Input } from '@/components/ui/input'

import ConversationCard, { ConversationCardSkeleton } from './conversationCard'

import { Conversation } from '../types'

const SideBar = ({
  hasInitialConversations,
  conversations,
  onConversationClick,
}: {
  hasInitialConversations: boolean
  conversations: Conversation[]
  onConversationClick: (id: string) => void
}) => {
  return (
    <>
      <div className="p-4 px-6 space-y-6">
        <h2 className="font-bold text-2xl">Messages</h2>
        <Input placeholder="Search" />
      </div>
      <div>
        {!hasInitialConversations ? (
          <>
            {Array.from({ length: 5 }, (_, i) => i + 1).map((_, key) => (
              <ConversationCardSkeleton key={key} />
            ))}
          </>
        ) : (
          <>
            {conversations.map((item) => {
              return (
                <div key={item.id} onClick={() => onConversationClick(item.id)}>
                  <ConversationCard
                    firstName={item.user.firstName}
                    lastName={item.user.lastName}
                    avatarUrl={item.user.avatarUrl}
                    textMessage={item.lastMessage.text}
                    date={item.lastMessage.date}
                  />
                </div>
              )
            })}
          </>
        )}
      </div>
    </>
  )
}

export default SideBar
