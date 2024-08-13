import classNames from 'classnames'
import { VirtuosoHandle } from 'react-virtuoso'
import { useRef } from 'react'

import { FaSpinner } from 'react-icons/fa6'

import Header from './header'
import Chat from './chat'
import Footer from './footer'
import { Message } from '../../types'

const Center = ({
  firstName,
  lastName,
  avatarUrl,
  messages,
  areMessagesFetched,
  onShowDetails,
  onBack,
  onSend,
}: {
  firstName: string
  lastName: string
  avatarUrl: string
  messages: Message[]
  areMessagesFetched: boolean
  onShowDetails: () => void
  onBack: () => void
  onSend: (message: string) => void
}) => {
  const chatRef = useRef<VirtuosoHandle | null>(null)
  return (
    <div className="h-full flex flex-col">
      <div
        className={classNames(
          'w-full h-[60px] flex items-center border-0 border-b-[1px] border-border'
        )}
      >
        <Header
          firstName={firstName}
          lastName={lastName}
          avatarUrl={avatarUrl}
          onShowDetails={onShowDetails}
          onBack={onBack}
        />
      </div>
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
