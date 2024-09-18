'use client'

import { useCallback, useEffect } from 'react'

import Grid from './components/grid'
// import Panel from './components/panel'
import BuildingDetailsDialog from './components/dialogs/farm-details-dialog'
import WarehouseDetailsDialog from './components/dialogs/warehouse-details-dialog'

import StoreProvider from './StoreProvider'
import { useAppSelector, useAppDispatch } from './hooks'
import { useToast } from './hooks/use-toast'

import { increaseDay } from './slices/day'
import { startProducing, endProducing } from './slices/farms'
import { putToWarehouse } from './slices/warehouses'
import {
  toggleFarmDetailsModal,
  toggleWarehouseDetailsModal,
} from './slices/ui'

import { Toaster } from './components/toaster'
import products from './data/items'
import { Farm } from './types/buildings'

function App() {
  const { toast } = useToast()
  const dispatch = useAppDispatch()
  const { farmDetailsId, warehouseDetailsId } = useAppSelector(
    (state) => state.ui
  )
  const day = useAppSelector((state) => state.day)
  const farms = useAppSelector((state) => state.farms)
  const warehouses = useAppSelector((state) => state.warehouses)

  // console.warn('render', day, farms[0])

  const selectedWarehouse = warehouses.find(
    (item) => item.id === warehouseDetailsId
  )
  const selectedFarm = farms.find((item) => item.id === farmDetailsId)

  useEffect(() => {
    const dayFarmCheck = (item: Farm) => {
      if (item.producing) {
        const { endDay, productId, cycles, power } = item.producing
        const itemData = products[productId]
        const warehouseId = '1' // TODO

        if (endDay === day) {
          dispatch(
            putToWarehouse({
              warehouseId,
              productId,
              count: power,
            })
          )

          if (cycles === undefined || cycles > 1) {
            dispatch(
              startProducing({
                day,
                farmId: item.id,
                productId,
                cycles: cycles === undefined ? undefined : cycles - 1,
                power,
                warehouseId: item.warehouseId as string,
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
    }

    farms.forEach(dayFarmCheck)
  }, [farms, day, dispatch, toast])

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
