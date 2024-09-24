import { useCallback } from 'react'

import { useAppSelector, useAppDispatch } from '../hooks/redux'

import Farm from '../components/buildings/farm'
import Warehouse from '../components/buildings/warehouse'

import { toggleWarehouseDetailsModal } from '../slices/ui'
import buildings from '../data/buildings'
// import { toggleRoad } from '../slices/roads'
import Roads from '../components/roads'
import { TransportIcon } from '../components/cards/transport'
import { PossibleRoads } from '../types/grid'

function Wrapper({
  position,
  cellSize,
  children,
}: {
  position: number[]
  cellSize: number
  children: React.ReactNode
}) {
  const [x = 0, y = 0] = position || []
  return (
    <div
      className="absolute"
      style={{
        left: `${x * cellSize}px`,
        top: `${y * cellSize}px`,
      }}
    >
      {children}
    </div>
  )
}

export default function BuildingsController({
  possibleRoads,
}: {
  possibleRoads: PossibleRoads
}) {
  const dispatch = useAppDispatch()
  const farms = useAppSelector((state) => state.farms)
  const day = useAppSelector((state) => state.day)
  const roads = useAppSelector((state) => state.roads)
  const shipments = useAppSelector((state) => state.shipments)
  const warehouses = useAppSelector((state) => state.warehouses)
  const { cellSize } = useAppSelector((state) => state.ui)

  const onItemClick = useCallback(
    (itemId: string) => {
      dispatch(toggleWarehouseDetailsModal(itemId))
    },
    [dispatch]
  )

  // console.warn('Buildings', shipments)

  return (
    <div
      className="absolute top-0 left-0 right-0 bottom-0"

      // onClick={(e) => {
      //   const { pageX, pageY } = e
      //   const x = Math.floor(pageX / cellSize)
      //   const y = Math.floor((pageY - 60) / cellSize)

      //   dispatch(toggleRoad([x, y]))

      //   console.warn('onClick', pageX, pageY, x, y)
      // }}
    >
      {farms.map((item) => (
        <Wrapper key={item.id} position={item.position} cellSize={cellSize}>
          <div
            style={{
              width: `${buildings.farm.size * cellSize}px`,
              height: `${buildings.farm.size * cellSize}px`,
            }}
          >
            <Farm day={day} farm={item} />
          </div>
        </Wrapper>
      ))}
      {warehouses.map((item) => (
        <Wrapper key={item.id} position={item.position} cellSize={cellSize}>
          <div
            style={{
              width: `${buildings.warehouse.size * cellSize}px`,
              height: `${buildings.warehouse.size * cellSize}px`,
            }}
          >
            <Warehouse item={item} onClick={() => onItemClick(item.id)} />
          </div>
        </Wrapper>
      ))}

      <Roads roads={roads} cellSize={cellSize} possibleRoads={possibleRoads} />

      {shipments.map((item) => (
        <Wrapper key={item.id} position={item.position} cellSize={cellSize}>
          <div
            style={{
              width: `${1 * cellSize - 2}px`,
              height: `${1 * cellSize - 2}px`,
            }}
            className="bg-background flex items-center justify-center"
          >
            <TransportIcon id="1" />
          </div>
        </Wrapper>
      ))}
    </div>
  )
}
