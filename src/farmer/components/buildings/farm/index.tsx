import { memo } from 'react'

import { cn } from '@/lib/utils'

import Cell from './cell'
import { Farm } from '../../../types/buildings'

export default memo(function FarmCell({
  day,
  farm,
  onClick,
}: {
  day: number
  farm: Farm
  onClick: () => void
}) {
  return (
    <div className="w-full h-full flex flex-col divide-y-0 divide-[#b4937e] 1shadow-sm 1shadow-[#b4937e] border overflow-hidden border-[#b4937e] rounded-sm">
      <div
        className={cn(
          'h-full relative border-0 border-gray-300 flex flex-wrap overflow-hidden'
        )}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((item) => {
          const isCenter = item === 4
          const correctIndex = item > 4 ? item - 1 : item

          const isProducingAvailableForCell = Boolean(
            farm.producing && farm.producing?.power > correctIndex
          )

          return (
            <Cell
              key={item}
              day={day}
              farmName={farm.name}
              producing={farm.producing}
              isBeingUsed={isProducingAvailableForCell}
              isCenter={isCenter}
              onBaseClick={onClick}
            />
          )
        })}
      </div>
    </div>
  )
})
