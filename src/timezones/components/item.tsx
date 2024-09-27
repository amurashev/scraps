'use client'

import { useState } from 'react'
import { IoTrash } from 'react-icons/io5'

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import TimezonesList from './timezone-list'

import { cn } from '@/lib/utils'

import timezones from '../data.json'
import { getUTCLabel } from '../utils'

const getTimeLabel = (value: number) => {
  const hours = Math.floor(value)
  const min = value - hours
  return `${hours < 10 ? '0' : ''}${hours}:${(min * 60) / 10}0`
}

export default function Item({
  timezoneKey,
  start,
  end,
  initialTimezoneKey,
  isMain,
  isSamePosition,
  onChangeTimezone,
  onDeleteClick,
}: {
  start: number
  end: number
  timezoneKey: number
  initialTimezoneKey: number
  isMain: boolean
  isSamePosition: boolean
  onChangeTimezone: (timezoneIndex: number) => void
  onDeleteClick: () => void
}) {
  const [hasDropdown, setHasDropdown] = useState(false)
  const timezoneValue = timezones[timezoneKey]
  const timezoneInitialValue = timezones[initialTimezoneKey]
  const utcLabel = getUTCLabel(timezoneValue.offset)

  return (
    <div className="space-y-1">
      <div className="text-sm space-x-1 font-bold flex justify-between items-center">
        <DropdownMenu open={hasDropdown} key={1}>
          <DropdownMenuTrigger
            asChild
            key={1}
            onClick={() => setHasDropdown(true)}
          >
            <div className="border-b border-dashed border-primary cursor-pointer">
              {timezoneValue.value} ({timezoneValue.abbr})
            </div>
          </DropdownMenuTrigger>
          <TimezonesList
            onInteractOutside={() => setHasDropdown(false)}
            onItemClick={(timezoneIndex) => {
              onChangeTimezone(timezoneIndex)
            }}
          />
        </DropdownMenu>
        {!isMain && (
          <div
            role="button"
            aria-label="Delete"
            tabIndex={0}
            onClick={() => onDeleteClick()}
          >
            <IoTrash size={14} />
          </div>
        )}
        <div className="flex-grow text-right">UTC{utcLabel}</div>
      </div>

      <div className="flex w-full pb-4">
        {Array.from({ length: 24 }, (_, i) => i).map((_, key) => {
          let shiftStart = start
          let shiftEnd = end

          const offsetDelta = timezoneInitialValue.offset - timezoneValue.offset
          const range = shiftEnd - shiftStart

          if (!isMain && !isSamePosition) {
            shiftStart = start - offsetDelta
            shiftEnd = end - offsetDelta
          }

          let isActive = false
          let isHalfCase: false | 'left' | 'right' = false
          let startLabel = false
          let endLabel = false

          const samePositionDiff = key - offsetDelta
          const shiftedSamePositionDiff =
            samePositionDiff < 0
              ? samePositionDiff + 24
              : Math.abs(samePositionDiff) % 24
          let labelToShow: string | number = getTimeLabel(
            isSamePosition ? shiftedSamePositionDiff : key
          )

          const fixedShiftStart =
            shiftStart < 0 ? shiftStart + 24 : Math.abs(shiftStart) % 24
          const fixedShiftEnd =
            shiftEnd < 0 ? shiftEnd + 24 : Math.abs(shiftEnd) % 24

          if (fixedShiftStart >= 0 && fixedShiftEnd < 24) {
            isActive = key >= fixedShiftStart && key < fixedShiftEnd

            if (
              key === Math.floor(fixedShiftStart) &&
              fixedShiftStart !== Math.ceil(fixedShiftStart)
            ) {
              isHalfCase = 'left'
              labelToShow = getTimeLabel(fixedShiftStart)
            }

            if (
              key === Math.floor(fixedShiftEnd) &&
              fixedShiftEnd !== Math.ceil(fixedShiftEnd)
            ) {
              isHalfCase = 'right'
              labelToShow = getTimeLabel(fixedShiftEnd)
            }
            startLabel = key === Math.floor(fixedShiftStart)
            endLabel = key === Math.floor(fixedShiftEnd)
          }
          if (fixedShiftStart >= 0 && fixedShiftEnd < fixedShiftStart) {
            isActive =
              (key >= 0 && key < fixedShiftEnd) || key >= fixedShiftStart
            startLabel = key === fixedShiftStart
            endLabel = key === fixedShiftEnd
          }

          return (
            <div className="h-[26px] flex flex-col flex-1 space-y-1 relative">
              {isHalfCase ? (
                <div className="flex justify-center w-full h-full flex-grow border-l border-muted">
                  <div
                    className={cn('w-full h-full', {
                      'bg-gray-400/20': isHalfCase === 'left',
                      'bg-[#55cead]': isHalfCase === 'right',
                    })}
                  />
                  <div
                    className={cn('w-full h-full', {
                      'bg-gray-400/20': isHalfCase === 'right',
                      'bg-[#55cead]': isHalfCase === 'left',
                    })}
                  />
                </div>
              ) : (
                <div
                  className={cn(
                    'flex justify-center w-full h-full flex-grow bg-gray-400/20 border-l border-muted',
                    {
                      'bg-[#55cead]': isActive,
                    }
                  )}
                />
              )}

              {(startLabel || endLabel) && range !== 0 && (
                <div
                  className={cn('absolute bottom-[-18px]', {
                    'left-[-14px]': !isHalfCase,
                    'left-[4px]': isHalfCase,
                  })}
                >
                  <div className="font-bold text-[10px]">{labelToShow}</div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
