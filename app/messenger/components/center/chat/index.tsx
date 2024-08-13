import classNames from 'classnames'
import { Virtuoso, VirtuosoHandle, ListProps } from 'react-virtuoso'
import { forwardRef } from 'react'

import { Message } from '../../../types'
import TextMessage from './text-message'

const INITIAL_TOP_INDEX = 1000000000

const List: React.FC<ListProps> = forwardRef((props, ref) => {
  return <div className="pl-3 pr-5 space-y-3" {...props} ref={ref} />
})

List.displayName = 'List';

const Chat = ({
  chatRef,
  messages,
}: {
  chatRef: { current: VirtuosoHandle | null }
  messages: Message[]
}) => {
  return (
    <Virtuoso
      // with the function is always follow the bottom, with value only when already at the bottom
      // if we have simetaneous requests, we still scroll to the bottom on message sent
      id="chat"
      key={'1'}
      alignToBottom
      followOutput={'smooth'}
      context={{}}
      ref={chatRef}
      data={messages}
      overscan={1}
      startReached={() => {
        console.warn('startReached')
      }}
      // atBottomStateChange={() => true}
      style={{ flex: '1 1 auto', overscrollBehavior: 'contain' }}
      // firstItemIndex={firstItemIndex}
      initialTopMostItemIndex={INITIAL_TOP_INDEX}
      itemContent={(_, item) => {
        const isYour = item.senderId === '1'
        return (
          <div
            className={classNames('flex ', {
              'justify-end': isYour,
            })}
          >
            <div key={item.id} className="w-full md:max-w-[60%]">
              <TextMessage
                firstName={item.sender.firstName}
                lastName={item.sender.lastName}
                avatarUrl={item.sender.avatarUrl}
                textMessage={item.text}
                date={item.date}
                isYour={isYour}
              />
            </div>
          </div>
        )
      }}
      increaseViewportBy={{ top: 0, bottom: 0 }}
      atBottomThreshold={0}
      components={{ List }}
    />
  )
}

export default Chat
