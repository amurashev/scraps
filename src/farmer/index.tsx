'use client'

import { useEffect } from 'react'

import Grid from './components/grid'
// import Panel from './components/panel'
import BuildingDetailsDialog from './components/building-details-dialog'
import WarehouseDetailsDialog from './components/warehouse-details-dialog'

import StoreProvider from './StoreProvider'
import { useAppSelector, useAppDispatch } from './hooks'
import { useToast } from './hooks/use-toast'
import { getNow } from './utils/time'

import { increaseDay } from './slices/day'
import { startProducing, endProducing } from './slices/farms'
import { putToWarehouse } from './slices/warehouses'
import {
  toggleFarmDetailsModal,
  toggleWarehouseDetailsModal,
} from './slices/ui'

import { Toaster } from './components/toaster'
import entities from './data/items'

function App() {
  const { toast } = useToast()
  const dispatch = useAppDispatch()
  const { farmDetailsId, warehouseDetailsId } = useAppSelector(
    (state) => state.ui
  )
  useAppSelector((state) => state.day)
  const farms = useAppSelector((state) => state.farms)
  const warehouses = useAppSelector((state) => state.warehouses)

  // console.warn('render', isBarnOpened)

  const selectedWarehouse = warehouses.find(
    (item) => item.id === warehouseDetailsId
  )

  const selectedFarm = farms.find((item) => item.id === farmDetailsId)

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(increaseDay())

      const now = getNow()

      farms.forEach((item) => {
        if (item.producing) {
          const { endTime, productId, cycles, power } = item.producing
          const itemData = entities[productId]

          if (endTime < now) {
            dispatch(
              putToWarehouse({
                warehouseId: '1',
                productId,
                count: power,
              })
            ) // TODO

            if (cycles === undefined || cycles > 1) {
              dispatch(
                startProducing({
                  farmId: item.id,
                  productId,
                  cycles: cycles === undefined ? undefined : cycles - 1,
                  power,
                })
              )
            } else {
              dispatch(endProducing({ farmId: item.id }))
            }

            toast({
              messageType: 'productMovedToWarehouse',
              additional: {
                productCount: power,
                productId,
                productName: itemData.name,
                warehouseName: 'Warehouse 1', // TODO
              },
            })
          }
        }
      })
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [dispatch, farms, toast])

  return (
    <main className="h-[calc(100vh-60px)] relative bg-[#bfda95] flex flex-col items-center">
      {/* <div className="absolute top-0 left-0 right-0">
        <Panel />
      </div> */}
      <div className="flex-grow flex flex-row items-center">
        <Grid />
      </div>
      <WarehouseDetailsDialog
        isOpen={Boolean(warehouseDetailsId)}
        item={selectedWarehouse}
        onClose={() => dispatch(toggleWarehouseDetailsModal(undefined))}
      />
      <BuildingDetailsDialog
        isOpen={Boolean(farmDetailsId)}
        item={selectedFarm}
        onClose={() => dispatch(toggleFarmDetailsModal(undefined))}
        onApply={(productId) => {
          if (farmDetailsId) {
            dispatch(
              startProducing({
                farmId: farmDetailsId,
                productId,
                cycles: 1,
                power: 8,
              })
            )

            dispatch(toggleFarmDetailsModal(undefined))
          }
        }}
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
