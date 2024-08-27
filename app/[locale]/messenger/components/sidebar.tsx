'use client'

import { Input } from '@/components/ui/input'

import ConversationCard, {
  ConversationCardSkeleton,
} from '@/components/messenger/conversation-card'

import { Conversation } from '../types'

function SideBar({
  hasInitialConversations,
  conversations,
  selectedId,
  onConversationClick,
}: {
  hasInitialConversations: boolean
  conversations: Conversation[]
  selectedId?: string
  onConversationClick: (id: string) => void
}) {
  return (
    <>
      <div className="p-4 px-6 space-y-6">
        <h2 className="font-bold text-2xl">Messages</h2>
        <Input placeholder="Search" />
      </div>
      <div className="divide-y divide-border">
        {!hasInitialConversations ? (
          <>
            {Array.from({ length: 5 }, (_, i) => i + 1).map((_, key) => (
              <ConversationCardSkeleton key={key} /> // eslint-disable-line react/no-array-index-key
            ))}
          </>
        ) : (
          <>
            {conversations.map((item) => {
              return (
                <div
                  role="button"
                  aria-label="Conversation"
                  tabIndex={0}
                  key={item.id}
                  onClick={() => onConversationClick(item.id)}
                >
                  <ConversationCard
                    firstName={item.user.firstName}
                    lastName={item.user.lastName}
                    avatarUrl={item.user.avatarUrl}
                    textMessage={item.lastMessage.text}
                    date={item.lastMessage.date}
                    isSelected={selectedId === item.id}
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
