import classNames from 'classnames'
import { Virtuoso, VirtuosoHandle, ListProps } from 'react-virtuoso'
import { forwardRef, memo, useMemo } from 'react'

import TextMessage from '@/components/messenger/text-message'

import { Message } from '../../../types'

export type EnhancedTextMessage = Message & {
  isNext: boolean
  isYour: boolean
}

const List: React.FC<ListProps> = forwardRef((props, ref) => {
  return <div className="pl-3 pr-5 space-y-1" {...props} ref={ref} />
})

function ListItem({ item }: { item: EnhancedTextMessage }) {
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
}

List.displayName = 'List'

function Chat({
  chatRef,
  messages,
}: {
  chatRef: { current: VirtuosoHandle | null }
  messages: Message[]
}) {
  /** Messages list is highly load part and we need constantly check performance */
  // console.info('Performance: Rendering <Chat /> - start')
  // console.time()
  // let startTime = performance.now()
  // while (performance.now() - startTime < 1500) {} // Do nothing to emulate extremely slow code
  // console.log('Performance: Rendering <Chat /> - end')
  // console.timeEnd()

  const groupedMessages = useMemo(() => {
    const arr: EnhancedTextMessage[] = []
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

  return (
    <Virtuoso
      // with the function is always follow the bottom, with value only when already at the bottom
      // if we have simetaneous requests, we still scroll to the bottom on message sent
      id="chat"
      alignToBottom
      followOutput="smooth"
      context={{}}
      ref={chatRef}
      data={groupedMessages}
      // overscan={1}
      startReached={() => {
        // console.warn('startReached')
      }}
      // atBottomStateChange={() => true}
      style={{ flex: '1 1 auto', overscrollBehavior: 'contain' }}
      // firstItemIndex={firstItemIndex}
      // initialTopMostItemIndex={INITIAL_TOP_INDEX}
      initialScrollTop={0}
      increaseViewportBy={{ top: 0, bottom: 0 }}
      atBottomThreshold={0}
      components={{ List }}
      itemContent={(_, item) => <ListItem item={item} />} // eslint-disable-line react/no-unstable-nested-components
    />
  )
}

export default memo(Chat)
