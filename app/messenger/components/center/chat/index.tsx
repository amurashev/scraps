import classNames from 'classnames'
import { Virtuoso, VirtuosoHandle, ListProps } from 'react-virtuoso'
import { forwardRef, memo, useMemo } from 'react'

import { Message } from '../../../types'
import TextMessage from './text-message'

export type EnhancedTextMessage = Message & {
  isNext: boolean
  isYour: boolean
}

const INITIAL_TOP_INDEX = 1000000000

const List: React.FC<ListProps> = forwardRef((props, ref) => {
  return <div className="pl-3 pr-5 space-y-0" {...props} ref={ref} />
})

List.displayName = 'List'

const Chat = ({
  chatRef,
  messages,
}: {
  chatRef: { current: VirtuosoHandle | null }
  messages: Message[]
}) => {
  /** Messages list is highly load part and we need constantly check performance */
  // console.info('Performance: Rendering <Chat /> - start')
  // console.time()
  // let startTime = performance.now()
  // while (performance.now() - startTime < 1500) {} // Do nothing to emulate extremely slow code
  // console.log('Performance: Rendering <Chat /> - end')
  // console.timeEnd()

  const groupedMessages = useMemo(() => {
    let arr: EnhancedTextMessage[] = []
    messages.forEach((item, key) => {
      const isYour = item.senderId === '1'
      const prevMessage = arr[key - 1]
      let isNext = false

      if (prevMessage && prevMessage.isYour && isYour) {
        isNext = true
      }

      arr.push({ ...item, isNext, isYour })
    })

    return arr
  }, [messages])

  console.warn(messages, groupedMessages)

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
      data={groupedMessages}
      overscan={1}
      startReached={() => {
        console.warn('startReached')
      }}
      // atBottomStateChange={() => true}
      style={{ flex: '1 1 auto', overscrollBehavior: 'contain' }}
      // firstItemIndex={firstItemIndex}
      initialTopMostItemIndex={INITIAL_TOP_INDEX}
      itemContent={(_, item) => {
        return (
          <div
            className={classNames('flex ', {
              'justify-end': item.isYour,
            })}
          >
            <div key={item.id} className="w-full md:max-w-[60%]">
              <TextMessage
                id={item.id}
                firstName={item.sender.firstName}
                lastName={item.sender.lastName}
                avatarUrl={item.sender.avatarUrl}
                text={item.text}
                date={item.date}
                isYour={item.isYour}
                isNext={item.isNext}
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

export default memo(Chat)
