import { useState, memo } from 'react'
import { IoTrashOutline } from 'react-icons/io5'

import { cn, sleep } from '@/lib/utils'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { CellState } from '../../../types'

import ProgressBar from './progress-bar'
import SeedsDropDown from './seeds-dropdown'
import ItemIcon from '../../products/item-icon'

type Props = {
  isActive: boolean
  cellSize: number
  cellState: CellState | null
  availableMoney: number
  onPlantSeed: (id: string) => void
  onRemovePlant: () => void
  onCollectHarvest: () => void
}

const arePropsEqual = () => {
  // if (
  //   JSON.stringify(prevProps.cellState) === JSON.stringify(nextProps.cellState)
  // ) {
  //   return true
  // }
  return false
}

const MIN_ICON_SIZE = 40

export default memo(function Cell({
  isActive,
  cellSize,
  cellState,
  availableMoney,
  onPlantSeed,
  onRemovePlant,
  onCollectHarvest,
}: Props) {
  const [isOpened, setIsOpened] = useState(false)

  const hasCellState = Boolean(cellState)

  let progress = 0
  let iconSize = MIN_ICON_SIZE

  if (cellState) {
    const { startGrowthTime, endGrowthTime } = cellState
    const now = 0
    const dGrowth = endGrowthTime - startGrowthTime
    const dNow = endGrowthTime - now

    progress = Math.floor(Math.min((100 * (dGrowth - dNow)) / dGrowth, 100))
    iconSize = MIN_ICON_SIZE + ((100 - MIN_ICON_SIZE) * progress) / 100
  }

  const isGrowthEnd = progress === 100

  const possibleSeedsId = ['1', '2']

  return (
    <DropdownMenu open={isOpened}>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          tabIndex={0}
          className={cn(
            'h-full flex items-center justify-center relative p-4 focus-visible:outline-none',
            {
              'bg-[#92766c]': isActive && !isGrowthEnd,
              'bg-[#738a75]': isActive && isGrowthEnd,
              'bg-[#b4b092]': !isActive,
              'cursor-pointer hover:bg-[#92766c]/80': !hasCellState && isActive,
            }
          )}
          style={{
            width: `${cellSize}px`,
            height: `${cellSize}px`,
          }}
          onClick={() => {
            if (isGrowthEnd) {
              onCollectHarvest()
            } else if (isActive) {
              setIsOpened(true)
            }
          }}
        >
          {cellState ? (
            <ItemIcon id={cellState.itemId} size={`${iconSize}%`} />
          ) : null}
          {hasCellState && progress !== 100 && (
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
        {!hasCellState ? (
          <SeedsDropDown
            possibleSeedsId={possibleSeedsId}
            availableMoney={availableMoney}
            onClick={async (itemId) => {
              setIsOpened(false)
              await sleep(100) // TODO: because of animation
              onPlantSeed(itemId)
            }}
          />
        ) : (
          <div className="">
            <div
              className="space-x-2 rounded-sm px-2 py-1.5 cursor-pointer flex items-center hover:bg-accent"
              onClick={async () => {
                setIsOpened(false)
                await sleep(100) // TODO: because of animation
                onRemovePlant()
              }}
              role="button"
              tabIndex={0}
            >
              <IoTrashOutline size={18} />
              <span>Remove</span>
            </div>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}, arePropsEqual)
