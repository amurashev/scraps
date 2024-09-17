import { memo } from 'react'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import { cn } from '@/lib/utils'

import { getNow } from '../../../utils/time'
import { FarmProducing } from '../../../types/buildings'

import ItemIcon from '../../products/item-icon'
import FarmIcon from '../../../icons/buildings/farm'

import ProgressBar from './progress-bar'
import entities from '@/src/farmer/data/items'

type Props = {
  producing?: FarmProducing
  isBeingUsed: boolean
  isCenter: boolean
  farmName: string
  onBaseClick: () => void
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
  producing,
  isBeingUsed,
  isCenter,
  farmName,
  onBaseClick,
}: Props) {
  // const hasCellState = Boolean(producing)

  let progress = 0
  let iconSize = MIN_ICON_SIZE

  if (producing) {
    const { startTime, endTime } = producing
    const now = getNow()
    const dGrowth = endTime - startTime
    const dNow = endTime - now

    progress = Math.floor(Math.min((100 * (dGrowth - dNow)) / dGrowth, 100))
    iconSize = MIN_ICON_SIZE + ((100 - MIN_ICON_SIZE) * progress) / 100
  }

  return (
    <div
      role="button"
      tabIndex={0}
      className={cn(
        'h-1/3 w-1/3 flex items-center justify-center relative p-4 focus-visible:outline-none',
        {
          'bg-[#92766c]': true,
          'border-[#b4937e] border': true,
          // 'bg-[#738a75]': isActive && isGrowthEnd,
          // 'bg-[#b4b092]': !isActive,
          'cursor-pointer hover:bg-[#92766c]/80': isCenter,
        }
      )}
      // style={{
      //   width: `${cellSize}px`,
      //   height: `${cellSize}px`,
      // }}
      onClick={() => {
        if (isCenter) {
          onBaseClick()
        }
      }}
    >
      {isCenter ? (
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger>
              <FarmIcon />
            </TooltipTrigger>
            <TooltipContent>
              <h3 className="font-bold text-base">{farmName}</h3>
              {producing && (
                <ul className="text-sm">
                  <li>
                    <b>Produces:</b> {entities[producing.productId].name}
                  </li>
                  <li>
                    <b>Cycles:</b>{' '}
                    {!producing.cycles ? 'Infinity' : producing.cycles}
                  </li>
                  <li>
                    <b>Power:</b> {producing.power}
                  </li>
                </ul>
              )}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
          {producing && isBeingUsed ? (
            <ItemIcon id={producing.productId} size={`${iconSize}%`} />
          ) : null}
        </>
      )}

      {isCenter && producing && (
        <div className="absolute bottom-0 left-0 right-0">
          <ProgressBar progress={progress} />
        </div>
      )}
    </div>
  )
}, arePropsEqual)
