import classNames from 'classnames'
import { VirtuosoHandle } from 'react-virtuoso'
import { useRef } from 'react'

import { FaSpinner } from 'react-icons/fa6'

import Chat from './chat'
import Footer from './footer'
import { Message } from '../../types'

function Center({
  messages,
  areMessagesFetched,
  onSend,
}: {
  messages: Message[]
  areMessagesFetched: boolean
  onSend: (message: string) => void
}) {
  const chatRef = useRef<VirtuosoHandle | null>(null)
  return (
    <div className="h-full flex flex-col border-0 border-l-[1px] border-r-[1px] border-border">
      {/* <div
        className={classNames(
          'w-full h-[60px] flex items-center border-0 border-b-[1px] border-border'
        )}
      >
        Header
      </div> */}
      <div className="flex-1 py-4">
        {areMessagesFetched ? (
          <Chat chatRef={chatRef} messages={messages} />
        ) : (
          <div className="w-full h-full grid items-center justify-center animate-spin">
            <FaSpinner size={18} />
          </div>
        )}
      </div>
      <div className="flex-shrink-0 w-full h-[60px] flex items-center border-0 border-t-[1px] border-border">
        <Footer chatRef={chatRef} onSend={onSend} />
      </div>
    </div>
  )
}

export default Center
