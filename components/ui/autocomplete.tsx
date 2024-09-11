'use client'

import {
  useCallback,
  forwardRef,
  useEffect,
  useRef,
  useState,
  memo,
} from 'react'
import * as Popover from '@radix-ui/react-popover'
import debounce from 'lodash.debounce'

import { cn } from '@/lib/utils'

import { Skeleton } from './skeleton'

type Item = {
  id: string
  label: string
}

const Input = memo(
  forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
    (props, ref) => {
      const [value, setValue] = useState('')
      const { placeholder, defaultValue, onKeyDown, onChange } = props

      useEffect(() => {
        setValue(defaultValue as string)
      }, [defaultValue])

      return (
        <input
          ref={ref}
          {...props}
          className={cn('ring-0 outline-0 bg-transparent h-full w-full')}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onChange={(e) => {
            setValue(e.target.value)
            onChange?.(e)
          }}
          onKeyDown={onKeyDown}
        />
      )
    }
  )
)

export default memo(function AutoComplete({
  defaultValue,
  placeholder,
  dataTestPrefix,
  onChange,
  onQueryChange,
  fetchData,
}: {
  placeholder?: string
  defaultValue: string
  dataTestPrefix: string
  onChange: (id: string | null) => void
  onQueryChange?: (id: string | null) => (id: string) => void
  fetchData: (query: string) => Promise<Item[]>
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [items, setItems] = useState<Item[]>([])

  const isReallyOpen = isLoading || (!isLoading && Boolean(items.length))

  const handleItemClick = useCallback(
    (itemId: string) => {
      onChange(itemId)
      setItems([])
    },
    [onChange]
  )

  const onKeyDown = async (e: any) => {
    const newValue = e.target.value

    const fetchResult = async (str: string) => {
      const values = await fetchData(str)
      setItems(values)
      setIsLoading(false)
      inputRef?.current?.focus()
    }

    if (newValue.length > 0 && !isLoading) {
      setIsLoading(true)
      await fetchResult(newValue)
    }
  }

  const debouncedKeyDown = useCallback(debounce(onKeyDown, 1000), []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Popover.Root open={isReallyOpen} modal={false}>
      <div className="relative w-full h-full">
        <Input
          ref={inputRef}
          onKeyDown={debouncedKeyDown}
          placeholder={placeholder}
          defaultValue={defaultValue}
          data-test={`${dataTestPrefix}_autocomplete`}
          onChange={(e) => {
            const newValue = e.target.value
            onChange(null)
            onQueryChange?.(newValue)
          }}
        />
        <Popover.Trigger className="absolute bottom-0 left-0" />
      </div>

      <Popover.Portal>
        <Popover.Content
          className="bg-background px-0 border border-solid border-border rounded-md min-w-[200px]"
          align="start"
          sideOffset={4}
          alignOffset={-4}
          onOpenAutoFocus={(e) => {
            e.preventDefault()
          }}
          onInteractOutside={() => {
            setItems([])
            inputRef?.current?.focus()
          }}
        >
          {isLoading ? (
            <div>
              {[1, 2, 3].map((item) => (
                <div key={item} className="px-4 py-3">
                  <Skeleton className="w-full h-4" />
                </div>
              ))}
            </div>
          ) : (
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
          )}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
})
