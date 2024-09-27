'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import Form from './components/form'
import List from './components/list'

import { getFromStorage, setToStorage } from './utils'

const appVersion = '1.00'
const STORAGE_KEY = 'timezones'

type StorageData = {
  start: number
  end: number
  items: number[]
  isSamePosition: boolean
  version: string
}

export default function TimezonesPage() {
  const [isReady, setIsReady] = useState(false)
  const [start, setStart] = useState(9)
  const [end, setEnd] = useState(17)
  const [items, setItems] = useState<number[]>([42])
  const [isSamePosition, setIsSamePosition] = useState(false)

  const handleTimeChange = (index: 'start' | 'end', value: string) => {
    const fixedValue = Number(value)
    if (index === 'start') {
      if (fixedValue > end) {
        setStart(end)
        setEnd(fixedValue)
      } else {
        setStart(fixedValue)
      }
    }
    if (index === 'end') {
      if (fixedValue < start) {
        setStart(fixedValue)
        setEnd(start)
      } else {
        setEnd(fixedValue)
      }
    }
  }

  const handleAddItem = () => setItems([...items, items[items.length - 1]])

  const handleDeleteItem = (itemIndex: number) => {
    setItems((currentItems) =>
      currentItems.filter((item, key) => key !== itemIndex)
    )
  }

  const handleChangeTimezone = (timezoneIndex: number, itemIndex: number) => {
    setItems(
      items.map((item, index) => {
        if (index === itemIndex) {
          return timezoneIndex
        }

        return item
      })
    )
  }

  useEffect(() => {
    if (isReady) {
      setToStorage<StorageData>(STORAGE_KEY, {
        start,
        end,
        items,
        isSamePosition,
        version: appVersion,
      })
    }
  }, [start, end, items, isSamePosition, isReady])

  useEffect(() => {
    const storageValues = getFromStorage<StorageData>(STORAGE_KEY)

    if (storageValues && storageValues.version) {
      setStart(storageValues.start)
      setEnd(storageValues.end)
      setItems(storageValues.items)
      setIsSamePosition(storageValues.isSamePosition || false)
    }
    setIsReady(true)
  }, [])

  const initialTimezoneKey = items[0]

  if (!isReady) return null

  return (
    <main className="w-full min-h-[calc(100vh-60px)] bg-muted p-2 md:p-6">
      <div className="max-w-3xl container space-y-4">
        <Form
          start={start.toString()}
          end={end.toString()}
          isSamePosition={isSamePosition}
          onChangeTime={handleTimeChange}
          onChangePositionParam={(value) => setIsSamePosition(value)}
        />

        <div>
          <List
            items={items}
            start={start}
            end={end}
            initialTimezoneKey={initialTimezoneKey}
            isSamePosition={isSamePosition}
            onDeleteClick={(itemIndex) => handleDeleteItem(itemIndex)}
            onChangeTimezone={(timezoneIndex, itemIndex) =>
              handleChangeTimezone(timezoneIndex, itemIndex)
            }
          />
        </div>
        <div className="flex justify-end">
          <Button onClick={handleAddItem}>Add timezone</Button>
        </div>
      </div>
    </main>
  )
}
