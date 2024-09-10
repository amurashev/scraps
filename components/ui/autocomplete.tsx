'use client'

import { useEffect, useState } from 'react'
import * as Popover from '@radix-ui/react-popover'

import { cn } from '@/lib/utils'

export default function AutoComplete({
  items,
  defaultValueId,
  placeholder,
  onChange,
}: {
  items: {
    id: string
    label: string
  }[]
  placeholder?: string
  defaultValueId: string | null
  onChange: (id: string | null) => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState('')

  const isReallyOpen = isOpen

  const handleItemClick = (itemId: string) => {
    setIsOpen(false)

    const selectedItem = items.find((item) => item.id === itemId)

    if (selectedItem) setValue(selectedItem?.label)

    onChange(itemId)
  }

  useEffect(() => {
    let defaultItem
    if (defaultValueId) {
      defaultItem = items.find((item) => item.id === defaultValueId)
    }

    setValue(defaultItem ? defaultItem.label : '')
  }, [defaultValueId]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Popover.Root open={isReallyOpen} modal={false}>
      <div className="relative w-full h-full">
        <input
          className={cn('ring-0 outline-0 bg-transparent h-full w-full')}
          value={value}
          placeholder={placeholder}
          onChange={(e) => {
            const newValue = e.target.value

            setValue(newValue)
            onChange(null)
            if (newValue.length > 0 && !isOpen) {
              setIsOpen(true)
            }

            if (newValue.length === 0) {
              setIsOpen(false)
            }
          }}
          onFocus={() => setIsOpen(true)}
        />
        <Popover.Trigger className="absolute bottom-0 left-0" />
      </div>

      <Popover.Portal>
        <Popover.Content
          className="bg-background px-0 border border-solid border-border rounded-md"
          align="start"
          sideOffset={4}
          alignOffset={-4}
          onOpenAutoFocus={(e) => {
            e.preventDefault()
          }}
          onInteractOutside={() => {
            setIsOpen(false)
          }}
        >
          <div>
            {items.map((item) => (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                className="px-4 py-2 hover:bg-muted cursor-pointer"
                onClick={() => {
                  handleItemClick(item.id)
                }}
              >
                {item.label}
              </div>
            ))}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
