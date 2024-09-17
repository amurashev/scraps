import { cn } from '@/lib/utils'

import { useAppDispatch } from '../../../hooks'

import { toggleFarmDetailsModal } from '../../../slices/ui'

import Cell from './cell'
import { Farm } from '../../../types/buildings'

export default function FarmCell({ farm }: { farm: Farm }) {
  const dispatch = useAppDispatch()

  return (
    <div className="h-full flex flex-col divide-y-0 divide-[#b4937e] shadow-sm shadow-[#b4937e] border-0 overflow-hidden border-[#b4937e] rounded-md">
      <div
        className={cn(
          'h-full relative border-0 border-gray-300 flex flex-wrap',
          {
            // 'divide-y-4 divide-[#b4937e]': isActive,
          }
        )}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((item) => {
          const isCenter = item === 4

          const isProducingAvailableForCell = Boolean(
            farm.producing && farm.producing?.power >= item
          )

          return (
            <Cell
              key={item}
              farmName={farm.name}
              producing={farm.producing}
              isBeingUsed={isProducingAvailableForCell}
              isCenter={isCenter}
              onBaseClick={() => {
                dispatch(toggleFarmDetailsModal(farm.id))
              }}
            />
          )
        })}
        {/* {rowsArray.map((pointY) => (
          <div
            key={pointY}
            className={cn('w-full h-1/3 flex flex-row', {
              'divide-x-4 divide-[#b4937e]': isActive,
            })}
          >
            {rowsArray.map((pointX) => {
              const isCenter = pointX === 1 && pointY === 1

              return (
                <Cell
                  key={pointX}
                  farmName={farm.name}
                  producing={farm.producing}
                  isCenter={isCenter}
                  onBaseClick={() => {
                    dispatch(toggleFarmDetailsModal(farm.id))
                  }}
                />
              )
            })}
          </div>
        ))} */}
      </div>
    </div>
  )
}
