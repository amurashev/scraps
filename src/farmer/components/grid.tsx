import { cn } from '@/lib/utils'

import { getCellPoint } from '../utils/cell'

import { useAppSelector, useAppDispatch } from '../hooks'
import { plantSeed, removePlant } from '../slices/grid'
import { removeSeed } from '../slices/seeds'
import { addItemToBarn } from '../slices/barn'

import Cell from './cell'

export default function Grid() {
  const dispatch = useAppDispatch()

  const grid = useAppSelector((state) => state.grid)
  const seeds = useAppSelector((state) => state.seeds)

  const rowsArray = [0, 1, 2]
  const cellSize = 120
  const isActive = true

  return (
    <div className="bg-[#bfda95] flex h-full justify-center items-center relative p-5">
      <div className="flex flex-col divide-y-0 divide-[#b4937e] border-8 border-[#b4937e] rounded-md">
        <div
          className={cn('relative border-0 border-gray-300 flex flex-col', {
            'divide-y-8 divide-[#b4937e]': isActive,
          })}
        >
          {rowsArray.map((pointY) => (
            <div
              key={pointY}
              className={cn('w-full flex flex-row', {
                'divide-x-8 divide-[#b4937e]': isActive,
              })}
            >
              {rowsArray.map((pointX) => {
                const cellPoint = getCellPoint(pointX, pointY)
                const cellState = grid[cellPoint]

                return (
                  <Cell
                    key={pointX}
                    cellSize={cellSize}
                    isActive={isActive}
                    cellState={cellState}
                    seeds={seeds}
                    onPlantSeed={(id) => {
                      dispatch(plantSeed({ id, point: cellPoint }))
                      dispatch(removeSeed({ id }))
                    }}
                    onRemovePlant={() => {
                      dispatch(removePlant({ point: cellPoint }))
                    }}
                    onCollectHarvest={() => {
                      const itemId = grid[cellPoint]?.itemId as string
                      dispatch(removePlant({ point: cellPoint }))
                      dispatch(addItemToBarn({ id: itemId }))
                    }}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
