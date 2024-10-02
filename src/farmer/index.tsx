'use client'

import { useEffect, useMemo } from 'react'

import StoreProvider from './StoreProvider'

import { Toaster } from './components/ui/toaster'

import DialogsController from './controllers/dialogs'
import TimeController from './controllers/time'
import BuildingsController from './controllers/buildings'
import PanelController from './controllers/panel'

import products from './data/products'

import { useAppSelector, useAppDispatch, useAppStore } from './hooks/redux'
import { useToast } from './hooks/use-toast'

import { startProducing, endProducing } from './slices/farms'
import { putToWarehouse, pickUpFromWarehouse } from './slices/warehouses'
import { updateShipmentStatus } from './slices/shipments'

import {
  alignAvailableCargo,
  convertCargoFromArrayToObject,
  getAvailableCargoArray,
} from './utils/shipment'
import { getPath, getAllSegments } from './utils/grid'
import { getWarehouseRoadPoint } from './utils/warehouse'

import type { Shipment } from './types/transport'
import type { PossibleRoads } from './types/grid'
import type { Farm, Warehouse } from './types/buildings'

function App() {
  const { toast } = useToast()
  const dispatch = useAppDispatch()
  const appStore = useAppStore()

  const time = useAppSelector((state) => state.time)
  const farms = useAppSelector((state) => state.farms)
  const warehouses = useAppSelector((state) => state.warehouses)
  const shipments = useAppSelector((state) => state.shipments)
  const roads = useAppSelector((state) => state.roads)

  const day = time.value

  const allSegments = useMemo(() => getAllSegments(roads), [roads])

  const possibleRoads = useMemo(() => {
    const points: Record<Warehouse['id'], Warehouse['position']> = {}
    warehouses.forEach((warehouse) => {
      points[warehouse.id] = warehouse.position
    })

    const pairs = warehouses.flatMap((v, i) =>
      warehouses.slice(i + 1).map((w) => `${v.id}-${w.id}`)
    )

    const obj: PossibleRoads = {}
    pairs.forEach((pair) => {
      const [id1, id2] = pair.split('-')
      const w1Point = getWarehouseRoadPoint(points[id1])
      const w2Point = getWarehouseRoadPoint(points[id2])

      const path = getPath({
        allSegments,
        p1: w1Point,
        p2: w2Point,
      })

      obj[pair] = path
      obj[`${id2}-${id1}`] = [...path].reverse()
    })
    return obj
  }, [roads, warehouses]) // eslint-disable-line react-hooks/exhaustive-deps

  // console.warn('render', shipments[0], possibleRoads)

  useEffect(() => {
    const dayFarmCheck = (farm: Farm) => {
      const { id, producing, warehouseId = '' } = farm
      if (producing) {
        const { endDay, productId, cycles, power } = producing
        const itemData = products[productId]

        if (endDay === day) {
          dispatch(
            putToWarehouse({
              warehouseId,
              productsToPut: {
                [productId]: power,
              },
            })
          )

          if (cycles === undefined || cycles > 1) {
            dispatch(
              startProducing({
                day,
                farmId: id,
                productId,
                cycles: cycles === undefined ? undefined : cycles - 1,
                power,
                warehouseId,
              })
            )
          } else {
            dispatch(endProducing({ farmId: id }))
          }

          const warehouseToMove = warehouses.find(
            (item) => item.id === warehouseId
          )

          toast({
            messageType: 'productMovedToWarehouse',
            additional: {
              productCount: power,
              productId,
              productName: itemData.name,
              warehouseName: warehouseToMove?.name,
            },
          })
        }
      }
    }

    const dayShipmentCheck = (shipment: Shipment) => {
      const { id, from, to, cargoPlan, cargoShipment, status, position } =
        shipment
      const shipmentPath = possibleRoads[`${from}-${to}`]

      if (status === 'new') {
        const currentWarehouses = appStore.getState().warehouses
        const currentWarehouse = currentWarehouses.find(
          (item) => item.id === from
        ) as Warehouse

        dispatch(
          updateShipmentStatus({
            id,
            status: 'collectCargo',
            position: currentWarehouse.position,
          })
        )
      }

      if (status === 'collectCargo') {
        const currentWarehouses = appStore.getState().warehouses
        const currentWarehouse = currentWarehouses.find(
          (item) => item.id === from
        ) as Warehouse

        const cargoObject = convertCargoFromArrayToObject(cargoPlan)
        const cargoObjectAvailable = alignAvailableCargo(
          cargoObject,
          currentWarehouse.products
        )

        dispatch(
          pickUpFromWarehouse({
            warehouseId: from,
            productsToPickUp: cargoObjectAvailable,
          })
        )

        const cargoTookFromWarehouse = getAvailableCargoArray(
          cargoPlan,
          cargoObjectAvailable
        )

        dispatch(
          updateShipmentStatus({
            id,
            status: 'goToP2',
            position: shipmentPath[0],
            cargo: cargoTookFromWarehouse,
          })
        )
      }

      if (status === 'goToP2') {
        const currentPositionIndex = shipmentPath.findIndex(
          (item) => item[0] === position[0] && item[1] === position[1]
        )

        const nextPosition = shipmentPath[currentPositionIndex + 1]
        if (nextPosition) {
          dispatch(
            updateShipmentStatus({
              id,
              status: 'goToP2',
              position: nextPosition,
            })
          )
        } else {
          const currentWarehouses = appStore.getState().warehouses
          const currentWarehouse = currentWarehouses.find(
            (item) => item.id === to
          ) as Warehouse

          dispatch(
            updateShipmentStatus({
              id,
              status: 'deliverCargo',
              position: currentWarehouse.position,
            })
          )
        }
      }

      if (status === 'deliverCargo') {
        const cargoObject = convertCargoFromArrayToObject(cargoShipment)

        dispatch(
          putToWarehouse({
            warehouseId: to,
            productsToPut: cargoObject,
          })
        )
        dispatch(
          updateShipmentStatus({
            id,
            status: 'goToP1',
            position: shipmentPath[shipmentPath.length - 1],
            cargo: [],
          })
        )
      }

      if (status === 'goToP1') {
        const currentPositionIndex = shipmentPath.findIndex(
          (item) => item[0] === position[0] && item[1] === position[1]
        )

        if (shipmentPath[currentPositionIndex - 1]) {
          dispatch(
            updateShipmentStatus({
              id,
              status: 'goToP1',
              position: shipmentPath[currentPositionIndex - 1],
            })
          )
        } else {
          const currentWarehouses = appStore.getState().warehouses
          const currentWarehouse = currentWarehouses.find(
            (item) => item.id === from
          ) as Warehouse
          dispatch(
            updateShipmentStatus({
              id,
              status: 'collectCargo',
              position: currentWarehouse.position,
            })
          )
        }
      }
    }

    farms.forEach(dayFarmCheck)
    shipments.forEach(dayShipmentCheck)
  }, [day, dispatch, toast, appStore]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main className="p-0 relative overflow-hidden max-h-[100vh] flex">
      <BuildingsController possibleRoads={possibleRoads} />

      <PanelController />

      <TimeController />
      <DialogsController />

      <Toaster />
    </main>
  )
}

export default function FarmerPage() {
  return (
    <StoreProvider>
      <App />
    </StoreProvider>
  )
}
