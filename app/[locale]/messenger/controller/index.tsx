'use client'

import { useEffect, useMemo, useReducer } from 'react'
import classNames from 'classnames'

import defaultState from './state'
import reducer from './reducers'
import { MessengerPageContext } from './context'
import { getConversations, getMessages, sendMessage } from './requests'
import { getTempMessage } from './utils'

import Center from '../components/center'
import UserDetails from '../components/userDetails'
import SideBar from '../components/sidebar'
import EmptyChat from '../components/emptyChat'

function Messenger() {
  const [state, dispatch] = useReducer(reducer, defaultState)

  const { conversations, messages, selectedConversationId, ui } = state
  const { hasDetailsBlock, mobileScreen } = ui

  const senderId = '1'

  const context = useMemo(
    () => ({
      actualUser: {
        id: senderId,
      },
    }),
    [senderId]
  )

  const selectedConversation = selectedConversationId
    ? conversations.data.find((item) => item.id === selectedConversationId)
    : undefined

  const onMessageSend = async (text: string) => {
    const tempMessage = getTempMessage({ text, senderId })
    dispatch({
      type: 'addMessage',
      payload: tempMessage,
    })

    const updatedMessage = await sendMessage({ text, senderId })
    dispatch({
      type: 'updateMessage',
      id: tempMessage.id,
      payload: updatedMessage,
    })
  }

  const conversationClick = async (id: string) => {
    dispatch({ type: 'setActiveConversation', id })
    dispatch({ type: 'changeMobileScreen', screen: 'chat' })
    dispatch({ type: 'setMessagesFetchStatus', value: false })

    const conversationMessages = await getMessages(id)

    dispatch({ type: 'addMessages', payload: conversationMessages })
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
    const newConversations = await getConversations()

    if (newConversations.length) {
      dispatch({ type: 'addConversations', payload: newConversations })
    }

    dispatch({ type: 'setInitialConversationFetchStatus', value: true })
  }

  useEffect(() => {
    fetchConversations()

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') goBack()
    })
  }, [])

  return (
    <MessengerPageContext.Provider value={context}>
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
            selectedId={selectedConversationId}
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
