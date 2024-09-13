import { useMemo, useState, memo } from 'react'

import { cn } from '@/lib/utils'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import ItemIcon from '../icons'
import { CellState } from '../../types'

import ProgressBar from './progress-bar'
import SeedsDropDown from './seeds-dropdown'
import { useStateContext } from '../../context'

export default memo(function Cell({
  isActive,
  size,
  cellState,
  onPlantSeed,
}: {
  isActive: boolean
  size: number
  cellState: CellState
  onPlantSeed: (id: string) => void
}) {
  const { seeds } = useStateContext()
  const [isOpened, setIsOpened] = useState(false)

  const possibleSeedsId = useMemo(
    () =>
      Object.keys(seeds)
        .filter((id) => seeds[id])
        .map((id) => id),
    [seeds]
  )

  const progress = 10
  const hasCellState = Boolean(cellState)

  return (
    <DropdownMenu open={isOpened}>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          tabIndex={0}
          className={cn('h-full flex items-center justify-center relative', {
            'bg-[#92766c] ': isActive,
            'p-8': true,
            'p-6': false,
            'p-4': false,
            'cursor-pointer hover:bg-[#92766c]/80': !hasCellState,
            // 'bg-gray-200/40': !isActive,
          })}
          style={{
            width: `${size}%`,
            height: `100%`,
          }}
          onClick={() => {
            if (!hasCellState) {
              setIsOpened(true)
            }
          }}
        >
          <div>{cellState ? <ItemIcon id={cellState.itemId} /> : null}</div>
          {hasCellState && (
            <div className="absolute bottom-0 left-0 right-0 ">
              <ProgressBar progress={progress} />
            </div>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        side="right"
        alignOffset={0}
        sideOffset={0}
        // className="min-w-[200px]"
        onInteractOutside={() => {
          setIsOpened(false)
        }}
      >
        <SeedsDropDown
          possibleSeedsId={possibleSeedsId}
          seeds={seeds}
          onClick={(itemId) => {
            setIsOpened(false)
            onPlantSeed(itemId)
          }}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
})
