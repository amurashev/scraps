'use client'

import { useCallback, useEffect } from 'react'

import Grid from './components/grid'
import Panel from './components/panel'
import BuildingDetailsDialog from './components/dialogs/farm-details-dialog'
import WarehouseDetailsDialog from './components/dialogs/warehouse-details-dialog'
import TransportsDialog from './components/dialogs/transports-dialog'
import ShipmentsDialog from './components/dialogs/shipment'

import StoreProvider from './StoreProvider'
import { useAppSelector, useAppDispatch, useAppStore } from './hooks/redux'
import { useToast } from './hooks/use-toast'

import { increaseDay } from './slices/day'
import { startProducing, endProducing } from './slices/farms'
import { putToWarehouse, pickUpFromWarehouse } from './slices/warehouses'
import {
  toggleFarmDetailsModal,
  toggleWarehouseDetailsModal,
  toggleTransportsModal,
  toggleShipmentModal,
} from './slices/ui'

import { Toaster } from './components/ui/toaster'
import products from './data/products'
import { Farm, Warehouse } from './types/buildings'
import {
  addShipment,
  deleteShipment,
  updateShipmentStatus,
} from './slices/shipments'
import { Cargo, Shipment } from './types/transport'
import { Product } from './types'

function App() {
  const { toast } = useToast()
  const dispatch = useAppDispatch()
  const {
    farmDetailsId,
    warehouseDetailsId,
    isTransportModal,
    isShipmentModal,
  } = useAppSelector((state) => state.ui)
  const day = useAppSelector((state) => state.day)
  const farms = useAppSelector((state) => state.farms)
  const warehouses = useAppSelector((state) => state.warehouses)
  const transports = useAppSelector((state) => state.transports)
  const shipments = useAppSelector((state) => state.shipments)
  const appStore = useAppStore()

  // console.warn('render', day, shipments[0])

  const selectedWarehouse = warehouses.find(
    (item) => item.id === warehouseDetailsId
  )
  const selectedFarm = farms.find((item) => item.id === farmDetailsId)

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
      const {
        id,
        from,
        to,
        cargoPlan,
        cargoShipment,
        status,
        statusDuration,
        statusStartDay,
      } = shipment
      const statusEndDay = statusStartDay + statusDuration
      const isDayForNextCycle = day >= statusEndDay

      if (status === 'new' && isDayForNextCycle) {
        dispatch(
          updateShipmentStatus({
            id,
            status: 'goToP1',
            duration: 5,
            startDay: day,
          })
        )
      }

      if (status === 'goToP1' && isDayForNextCycle) {
        dispatch(
          updateShipmentStatus({
            id,
            status: 'collectCargo',
            duration: 1,
            startDay: day,
          })
        )
      }

      if (status === 'collectCargo' && isDayForNextCycle) {
        const currentWarehouses = appStore.getState().warehouses
        const currentWarehouse = currentWarehouses.find(
          (item) => item.id === from
        ) as Warehouse

        const cargoToObject: Record<Product['id'], number> = {}
        cargoPlan.forEach((item) => {
          let countToGet = 0
          const productId = item.itemId

          if (cargoToObject[productId]) {
            countToGet = cargoToObject[productId] + item.count
          } else {
            countToGet = item.count
          }

          const countOnWarehouse = currentWarehouse.products[productId] || 0
          cargoToObject[productId] = Math.min(countToGet, countOnWarehouse)
        })

        dispatch(
          pickUpFromWarehouse({
            warehouseId: from,
            productsToPickUp: cargoToObject,
          })
        )

        const cargoToObjectCopy = { ...cargoToObject }
        const cargoTookFromWarehouse: Cargo[] = []

        cargoPlan.forEach((item) => {
          if (cargoToObjectCopy[item.itemId] > 0) {
            cargoTookFromWarehouse.push(item)
            cargoToObjectCopy[item.itemId] -= 1
          }
        })

        dispatch(
          updateShipmentStatus({
            id,
            status: 'goToP2',
            duration: 7,
            startDay: day,
            cargo: cargoTookFromWarehouse,
          })
        )
      }

      if (status === 'goToP2' && isDayForNextCycle) {
        dispatch(
          updateShipmentStatus({
            id,
            status: 'deliverCargo',
            duration: 1,
            startDay: day,
          })
        )
      }

      if (status === 'deliverCargo' && isDayForNextCycle) {
        const cargoToObject: Record<Product['id'], number> = {}
        cargoShipment.forEach((item) => {
          if (cargoToObject[item.itemId]) {
            cargoToObject[item.itemId] += item.count
          } else {
            cargoToObject[item.itemId] = item.count
          }
        })

        dispatch(
          putToWarehouse({
            warehouseId: to,
            productsToPut: cargoToObject,
          })
        )
        dispatch(
          updateShipmentStatus({
            id,
            status: 'goToP1',
            duration: 10,
            startDay: day,
            cargo: [],
          })
        )
      }
    }

    farms.forEach(dayFarmCheck)
    shipments.forEach(dayShipmentCheck)
  }, [farms, day, shipments, warehouses, dispatch, toast, appStore])

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(increaseDay())
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [dispatch])

  return (
    <main className="h-[calc(100vh-60px)] relative bg-[#bfda95] flex flex-col items-center">
      <div className="absolute top-0 left-0 right-0">
        <Panel />
      </div>
      <div className="flex-grow flex flex-row items-center">
        <Grid />
      </div>
      <WarehouseDetailsDialog
        isOpen={Boolean(warehouseDetailsId)}
        item={selectedWarehouse}
        onClose={() => dispatch(toggleWarehouseDetailsModal(undefined))}
      />
      <TransportsDialog
        isOpen={isTransportModal}
        transports={transports}
        onClose={useCallback(
          () => dispatch(toggleTransportsModal()),
          [dispatch]
        )}
      />
      <ShipmentsDialog
        isOpen={isShipmentModal}
        shipments={shipments}
        warehouses={warehouses}
        transports={transports}
        onClose={useCallback(() => dispatch(toggleShipmentModal()), [dispatch])}
        onAddShipment={useCallback(
          (data) => {
            dispatch(
              addShipment({
                ...data,
                day,
              })
            )
          },
          [dispatch, day]
        )}
        onDeleteShipment={useCallback(
          (id) => {
            dispatch(deleteShipment(id))
          },
          [dispatch]
        )}
      />
      <BuildingDetailsDialog
        isOpen={Boolean(farmDetailsId)}
        item={selectedFarm}
        warehouses={warehouses}
        day={day}
        onClose={useCallback(
          () => dispatch(toggleFarmDetailsModal(undefined)),
          [dispatch]
        )}
        onStop={useCallback(() => {
          dispatch(endProducing({ farmId: farmDetailsId as string }))
        }, [dispatch, farmDetailsId])}
        onApply={useCallback(
          (data) => {
            const { productId, cycles, power, warehouseId } = data
            if (farmDetailsId) {
              dispatch(
                startProducing({
                  day,
                  farmId: farmDetailsId,
                  productId,
                  cycles,
                  power,
                  warehouseId,
                })
              )

              dispatch(toggleFarmDetailsModal(undefined))
            }
          },
          [dispatch, farmDetailsId, day]
        )}
      />
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
