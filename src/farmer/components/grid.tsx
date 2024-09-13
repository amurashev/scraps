import { cn } from '@/lib/utils'

import { GridPoint } from '../types'
import { getCellPoint } from '../utils/cell'
import { useStateContext } from '../context'

import Cell from './cell'

function BigCell({
  isActive,
  onPlantSeed,
}: {
  isActive: boolean
  onPlantSeed: (id: string, point: GridPoint) => void
}) {
  const { grid } = useStateContext()
  const rowsArray = [0, 1, 2]
  const size = 100 / rowsArray.length
  const size1 = 300

  return (
    <div
      className={cn('relative border-0 border-gray-300 flex flex-col', {
        'divide-y-8 divide-[#b4937e]': isActive,
        // 'opacity-10': !isActive,
        // 'hover:outline outline-foreground rounded-sm': !isActive
      })}
      style={{
        width: `${size1}px`,
        height: `${size1}px`,
      }}
    >
      {rowsArray.map((row) => (
        <div
          key={row}
          className={cn('w-full flex flex-row', {
            'divide-x-8 divide-[#b4937e]': isActive,
          })}
          style={{
            height: `${size}%`,
          }}
        >
          {rowsArray.map((col) => {
            const cellPoint = getCellPoint(row, col)
            const cellState = grid[cellPoint]

            return (
              <Cell
                key={col}
                size={size}
                isActive={isActive}
                cellState={cellState}
                onPlantSeed={(id) => onPlantSeed(id, cellPoint)}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default function Grid({
  onPlantSeed,
}: {
  onPlantSeed: (id: string, point: GridPoint) => void
}) {
  // const rowsArray = Array.from({ length: 30 }, (_, i) => i + 1)

  return (
    <div className="flex h-full justify-center items-center relative p-5 ">
      <div className="flex flex-col divide-y-0 divide-[#b4937e] border-8 border-[#b4937e] rounded-md">
        {[0].map((row) => (
          <div key={row} className="flex flex-row divide-x-0 divide-[#b4937e]">
            {[0].map((col) => (
              <div key={col}>
                <BigCell
                  isActive={row === 0 && col === 0}
                  onPlantSeed={onPlantSeed}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
