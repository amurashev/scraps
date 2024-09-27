'use client'

import Item from './item'

export default function List({
  items,
  start,
  end,
  initialTimezoneKey,
  isSamePosition,
  onChangeTimezone,
  onDeleteClick,
}: {
  items: number[]
  start: number
  end: number
  initialTimezoneKey: number
  isSamePosition: boolean
  onChangeTimezone: (timezoneIndex: number, itemIndex: number) => void
  onDeleteClick: (itemIndex: number) => void
}) {
  return (
    <div className="">
      <div className="space-y-5 flex flex-col">
        {items.map((timezoneKey, itemIndex) => {
          const isMain = itemIndex === 0

          return (
            <Item
              timezoneKey={timezoneKey}
              start={start}
              end={end}
              isMain={isMain}
              isSamePosition={isSamePosition}
              initialTimezoneKey={initialTimezoneKey}
              onDeleteClick={() => onDeleteClick(itemIndex)}
              onChangeTimezone={(timezoneIndex) =>
                onChangeTimezone(timezoneIndex, itemIndex)
              }
            />
          )
        })}
      </div>
    </div>
  )
}
