import { useCallback } from 'react'

import { useAppSelector, useAppDispatch } from '../hooks/redux'

import Grid from '../components/grid'
import Roads from '../components/grid/roads'
import Paths from '../components/paths'
import EditGrid from '../components/editGrid'
import ShipmentOnGrid from '../components/grid/shipment'
import Buildings from '../components/grid/buildings'

import {
  toggleWarehouseDetailsModal,
  toggleFarmDetailsModal,
  toggleShopModal,
} from '../slices/ui'
import { createWarehouse } from '../slices/warehouses'
import { createFarm } from '../slices/farms'
import { toggleRoad } from '../slices/roads'
import { GRID_LENGTH } from '../config/main'

import { PossibleRoads } from '../types/grid'

export default function BuildingsController({
  possibleRoads,
}: {
  possibleRoads: PossibleRoads
}) {
  const dispatch = useAppDispatch()
  const farms = useAppSelector((state) => state.farms)
  const { value } = useAppSelector((state) => state.time)
  const roads = useAppSelector((state) => state.roads)
  const shipments = useAppSelector((state) => state.shipments)
  const warehouses = useAppSelector((state) => state.warehouses)
  const simpleBuildings = useAppSelector((state) => state.simpleBuildings)
  const { cellSize, pointOfView } = useAppSelector((state) => state.grid)
  const { hasPaths } = useAppSelector((state) => state.ui)
  const { createItem } = useAppSelector((state) => state.editMode)

  const day = value

  const onCreateItem = useCallback(
    (point: number[]) => {
      if (createItem === 'road') {
        dispatch(toggleRoad(point))
      }

      if (createItem === 'warehouse') {
        dispatch(
          createWarehouse({
            position: point,
          })
        )
      }

      if (createItem === 'farm') {
        dispatch(
          createFarm({
            position: point,
          })
        )
      }
    },
    [createItem, dispatch]
  )

  return (
    <div
      className="bg-[#bfda95] border border-[#b1ce85] p-20 overflow-hidden"
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <div
        className="relative"
        id="grid"
        style={{
          width: `${GRID_LENGTH * cellSize + 1}px`,
          height: `${GRID_LENGTH * cellSize + 1}px`,
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 bottom-0 w-full h-full"
          style={{
            top: `${pointOfView[1] * cellSize * -1}px`,
            left: `${pointOfView[0] * cellSize * -1}px`,
          }}
        >
          <Grid cellSize={cellSize} />

          {createItem && (
            <EditGrid
              item={createItem}
              cellSize={cellSize}
              pointOfView={pointOfView}
              onClick={onCreateItem}
            />
          )}

          <Buildings
            farms={farms}
            warehouses={warehouses}
            simpleBuildings={simpleBuildings}
            cellSize={cellSize}
            day={day}
            onWarehouseClick={useCallback(
              (itemId) => {
                dispatch(toggleWarehouseDetailsModal(itemId))
              },
              [dispatch]
            )}
            onFarmClick={useCallback(
              (itemId) => {
                dispatch(toggleFarmDetailsModal(itemId))
              },
              [dispatch]
            )}
            onShopClick={useCallback(
              (itemId) => {
                dispatch(toggleShopModal(itemId))
              },
              [dispatch]
            )}
          />

          <Roads
            roads={roads}
            cellSize={cellSize}
            mode={createItem === 'road' ? 'edit' : 'regular'}
            onRoadClick={useCallback(
              (point) => {
                if (createItem === 'road') {
                  dispatch(toggleRoad(point))
                }
              },
              [createItem, dispatch]
            )}
          />

          {hasPaths && (
            <Paths cellSize={cellSize} possibleRoads={possibleRoads} />
          )}

          {shipments.map((item) => (
            <ShipmentOnGrid key={item.id} item={item} cellSize={cellSize} />
          ))}
        </div>
      </div>
    </div>
  )
}
