'use client'

import {
  DropdownMenuPortal,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu'

import timezones from '../data.json'
import { getUTCLabel } from '../utils'

export default function TimezonesList({
  onInteractOutside,
  onItemClick,
}: {
  onInteractOutside: () => void
  onItemClick: (index: number) => void
}) {
  return (
    <DropdownMenuPortal>
      <DropdownMenuContent
        align="start"
        side="bottom"
        onInteractOutside={onInteractOutside}
      >
        <div className="h-[300px] overflow-y-auto divide-y divide-border cursor-pointer">
          {timezones.map((item, index) => (
            <div
              role="button"
              tabIndex={0}
              aria-label="Timezone"
              key={item.value}
              className="flex justify-between space-x-2 pr-2 py-1 pl-2 hover:bg-muted"
              onClick={() => {
                onItemClick(index)
                onInteractOutside()
              }}
            >
              <div>{item.value}</div>
              <div className="font-bold">{getUTCLabel(item.offset)}</div>
            </div>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  )
}
