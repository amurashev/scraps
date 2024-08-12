'use client'

import { useReducer } from 'react'

import { Input } from '@/components/ui/input'

import defaultState from './state'
import reducer from './reducer'

import ConversationCard from '../components/conversationCard'
import Chat from '../components/chat'
import UserDetails from '../components/userDetails'

function Messenger() {
  const [state, dispatch] = useReducer(reducer, defaultState)

  const { conversations, selectedConversationId } = state

  console.warn('Messenger', state)

  const selectedConversation = selectedConversationId
    ? conversations.find((item) => item.id === selectedConversationId)
    : undefined

  return (
    <div className="w-full h-[calc(100vh-65px)] grid grid-cols-12">
      <div className="bg-background h-full col-span-3 border-0 border-r-[1px] border-border">
        <div className="p-4 px-6 space-y-6">
          <h2 className="font-bold text-2xl">Messages</h2>
          <Input placeholder="Search" />
        </div>
        <div>
          {conversations.map((item) => {
            return (
              <div
                key={item.id}
                onClick={() =>
                  dispatch({ type: 'setActiveConversation', id: item.id })
                }
              >
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
      </div>
      <div className="bg-background h-full col-span-6">
        {selectedConversation && (
          <Chat
            firstName={selectedConversation.user.firstName}
            lastName={selectedConversation.user.lastName}
            avatarUrl={selectedConversation.user.avatarUrl}
          />
        )}
      </div>
      <div className="bg-background border-0 border-l-[1px] border-border h-full col-span-3">
        {selectedConversation && (
          <UserDetails
            firstName={selectedConversation.user.firstName}
            lastName={selectedConversation.user.lastName}
            avatarUrl={selectedConversation.user.avatarUrl}
          />
        )}
      </div>
    </div>
  )
}

export default Messenger
