import { useCallback } from 'react'

import { useAppSelector, useAppDispatch } from '../hooks/redux'

import Farm from '../components/buildings/farm'
import Warehouse from '../components/buildings/warehouse'
import Grid from '../components/grid'
import Roads from '../components/roads'
import Paths from '../components/paths'
import EditGrid from '../components/editGrid'
import { TransportIcon } from '../components/cards/transport'

import { toggleWarehouseDetailsModal, toggleShopModal } from '../slices/ui'
import { createWarehouse } from '../slices/warehouses'
import { createFarm } from '../slices/farms'
import { toggleRoad } from '../slices/roads'

import buildings from '../data/buildings'
import { PossibleRoads } from '../types/grid'
import SimpleBuildings from '../components/simpleBuildings'

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
  const simpleBuildings = useAppSelector((state) => state.simpleBuildings)
  const { cellSize, hasPaths } = useAppSelector((state) => state.ui)
  const { createItem } = useAppSelector((state) => state.editMode)

  const onItemClick = useCallback(
    (itemId: string) => {
      dispatch(toggleWarehouseDetailsModal(itemId))
    },
    [dispatch]
  )

  const onCreateItem = useCallback(
    (point: number[]) => {
      console.warn('onCreateItem', createItem, point)
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

  // console.warn('Buildings', JSON.stringify(roads))

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0">
      <Grid cellSize={cellSize} />

      <SimpleBuildings
        cellSize={cellSize}
        buildings={simpleBuildings}
        onShopClick={useCallback(() => {
          dispatch(toggleShopModal('1')) // TODO
        }, [dispatch])}
      />

      {createItem && (
        <EditGrid
          item={createItem}
          cellSize={cellSize}
          onClick={onCreateItem}
        />
      )}

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

      {hasPaths && <Paths cellSize={cellSize} possibleRoads={possibleRoads} />}

      {shipments.map((item) => (
        <Wrapper key={item.id} position={item.position} cellSize={cellSize}>
          <div
            style={{
              width: `${1 * cellSize - 2}px`,
              height: `${1 * cellSize - 2}px`,
              left: `${1 * cellSize}px`,
              // top: `${1 * cellSize}px`,
            }}
            className="bg-background8 flex items-center justify-center 7p-2 7rounded-full"
          >
            <TransportIcon id="1" />
          </div>
        </Wrapper>
      ))}
    </div>
  )
}
