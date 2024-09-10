'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export default function FilterDropdown({
  label,
  items = [],
  defaultValue = [],
  onApplyClick,
}: {
  label: string
  defaultValue: string[]
  items: {
    id: string
    label: string
  }[]
  onApplyClick: (values: string[]) => void
}) {
  const [isOpened, setIsOpened] = useState(false)
  const [values, setValues] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (isOpened) {
      const obj: Record<string, boolean> = {}
      items.forEach((item) => {
        obj[item.id] = defaultValue.includes(item.id)
      })

      setValues(obj)
    }
  }, [isOpened]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <DropdownMenu open={isOpened}>
      <DropdownMenuTrigger asChild>
        <Button
          size="lg"
          className={cn('space-x-2', {
            'ring-2 ring-ring': isOpened,
          })}
          variant="outline"
          onClick={() => setIsOpened(true)}
        >
          <span className="font-bold">{label}</span>
          {defaultValue.length > 0 && (
            <Badge size="sm">{defaultValue.length}</Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="min-w-[200px]"
        onInteractOutside={() => {
          setIsOpened(false)
        }}
      >
        <div className="p-2 space-y-3">
          {items.map((item) => (
            <div className="flex items-center space-x-2 w-full" key={item.id}>
              <Checkbox
                id={item.id}
                defaultChecked={values[item.id]}
                onCheckedChange={(value) => {
                  setValues({ ...values, [item.id]: Boolean(value) })
                }}
              />
              <label
                htmlFor={item.id}
                className="text-sm font-medium cursor-pointer flex-grow leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {item.label}
              </label>
            </div>
          ))}
        </div>
        <DropdownMenuSeparator />
        <div className="p-1 flex justify-end">
          <Button
            size="sm"
            onClick={() => {
              setIsOpened(false)

              const finalValues: string[] = []

              Object.keys(values).forEach((index) => {
                if (values[index]) {
                  finalValues.push(index)
                }
              })

              onApplyClick(finalValues)
            }}
          >
            Apply
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
