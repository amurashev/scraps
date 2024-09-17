import { useCallback } from 'react'

import { useAppSelector, useAppDispatch } from '../hooks'

import Farm from './buildings/farm'
import Warehouse from './buildings/warehouse'

import { toggleWarehouseDetailsModal } from '../slices/ui'

export default function Grid() {
  const dispatch = useAppDispatch()
  const farms = useAppSelector((state) => state.farms)
  const warehouses = useAppSelector((state) => state.warehouses)

  const onItemClick = useCallback(
    (itemId: string) => {
      dispatch(toggleWarehouseDetailsModal(itemId))
    },
    [dispatch]
  )

  // console.warn('farms', farms)

  const cellSize = 75

  return (
    <div className="flex justify-center items-center gap-0 relative p-5">
      {farms.map((item) => {
        return (
          <div
            key={item.id}
            className="p-[1px]"
            style={{
              width: `${3 * cellSize}px`,
              height: `${3 * cellSize}px`,
            }}
          >
            <Farm farm={item} />
          </div>
        )
      })}
      {warehouses.map((item) => {
        return (
          <div
            key={item.id}
            className="p-[1px]"
            style={{
              width: `${cellSize}px`,
              height: `${cellSize}px`,
            }}
          >
            <Warehouse item={item} onClick={() => onItemClick(item.id)} />
          </div>
        )
      })}
    </div>
  )
}
