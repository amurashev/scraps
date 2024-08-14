'use client'

import { useReducer } from 'react'

import { sleep } from '@/lib/utils'

import defaultState from './state'
import reducer from './reducers'
import { getMessage } from '../utils'

import Center from '../components/center'

function AI() {
  const [state, dispatch] = useReducer(reducer, defaultState)
  const { data, areFetched } = state

  const senderId = '1'

  const sendMessage = async (text: string) => {
    const newMessage = getMessage(text, senderId)

    dispatch({
      type: 'addMessage',
      payload: newMessage,
    })

    await sleep(500)

    dispatch({
      type: 'updateMessage',
      id: newMessage.id,
      payload: {
        ...newMessage,
        id: `${Date.now()}_${senderId}`,
      },
    })
  }

  return (
    <div className="w-full h-[calc(100vh-60px)] flex justify-center">
      <div className="max-w-2xl flex-1">
        <Center
          messages={data}
          areMessagesFetched={areFetched}
          onSend={sendMessage}
        />
      </div>
    </div>
  )
}

export default AI
