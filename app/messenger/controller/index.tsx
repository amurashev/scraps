'use client'

import { useEffect, useReducer } from 'react'
import classNames from 'classnames'

import defaultState from './state'
import reducer from './reducers'

import Center from '../components/center'
import UserDetails from '../components/userDetails'
import SideBar from '../components/sidebar'
import EmptyChat from '../components/emptyChat'

import { MessengerPageContext } from './context'
import { getConversations, getMessages, sendMessage } from './requests'

function Messenger() {
  const [state, dispatch] = useReducer(reducer, defaultState)

  const { conversations, messages, selectedConversationId, ui } = state
  const { hasDetailsBlock, mobileScreen } = ui

  const selectedConversation = selectedConversationId
    ? conversations.data.find((item) => item.id === selectedConversationId)
    : undefined

  const onMessageSend = async (text: string) => {
    const newMessage = await sendMessage(text)
    dispatch({
      type: 'addMessage',
      payload: newMessage,
    })
  }

  const conversationClick = async (id: string) => {
    dispatch({ type: 'setActiveConversation', id })
    dispatch({ type: 'changeMobileScreen', screen: 'chat' })
    dispatch({ type: 'setMessagesFetchStatus', value: false })

    const messages = await getMessages(id)

    dispatch({ type: 'addMessages', payload: messages })
    dispatch({ type: 'setMessagesFetchStatus', value: true })
  }

  const goBack = () => {
    dispatch({ type: 'setActiveConversation', id: undefined })
    dispatch({ type: 'changeMobileScreen', screen: 'list' })
    dispatch({ type: 'hideDetailsBlock' })
  }

  const hideMobileDetails = () => {
    dispatch({ type: 'hideDetailsBlock' })
    dispatch({ type: 'changeMobileScreen', screen: 'chat' })
  }

  const showDetails = () => {
    dispatch({ type: 'toggleDetailsBlock' })
    dispatch({ type: 'changeMobileScreen', screen: 'details' })
  }

  const fetchConversations = async () => {
    const conversations = await getConversations()

    if (conversations.length) {
      dispatch({ type: 'addConversations', payload: conversations })
    }

    dispatch({ type: 'setInitialConversationFetchStatus', value: true })
  }

  useEffect(() => {
    fetchConversations()

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') goBack()
    })
  }, [])

  console.warn('Messenger', state)

  return (
    <MessengerPageContext.Provider
      value={{
        opponent: selectedConversation ? selectedConversation.user : undefined,
      }}
    >
      <div className="w-full h-[calc(100vh-60px)] grid grid-cols-12">
        <div
          className={classNames(
            'bg-background h-full col-span-12 border-0 border-r-[1px] border-border',
            'md:col-span-3',
            {
              hidden: mobileScreen !== 'list',
              'md:block': true,
            }
          )}
        >
          <SideBar
            hasInitialConversations={conversations.areFetched}
            conversations={conversations.data}
            onConversationClick={conversationClick}
          />
        </div>
        <div
          className={classNames('bg-background h-full col-span-12', {
            'md:col-span-6': hasDetailsBlock,
            'md:col-span-9': !hasDetailsBlock,

            hidden: mobileScreen !== 'chat',
            'md:block': true,
          })}
        >
          {selectedConversation ? (
            <Center
              firstName={selectedConversation.user.firstName}
              lastName={selectedConversation.user.lastName}
              avatarUrl={selectedConversation.user.avatarUrl}
              messages={messages.data}
              areMessagesFetched={messages.areFetched}
              onShowDetails={showDetails}
              onBack={goBack}
              onSend={onMessageSend}
            />
          ) : (
            <EmptyChat />
          )}
        </div>

        {hasDetailsBlock && (
          <div
            className={classNames(
              'bg-background border-0 border-l-[1px] border-border h-full col-span-12',
              'md:col-span-3',
              {
                hidden: mobileScreen !== 'details',
                'md:block': true,
              }
            )}
          >
            {selectedConversation && (
              <UserDetails
                firstName={selectedConversation.user.firstName}
                lastName={selectedConversation.user.lastName}
                avatarUrl={selectedConversation.user.avatarUrl}
                onBack={hideMobileDetails}
              />
            )}
          </div>
        )}
      </div>
    </MessengerPageContext.Provider>
  )
}

export default Messenger
