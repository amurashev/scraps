'use client'

import { useCallback } from 'react'

import BuildingDetailsDialog from '../components/dialogs/farm-details-dialog'
import WarehouseDetailsDialog from '../components/dialogs/warehouse-details-dialog'
import TransportsDialog from '../components/dialogs/transports-dialog'
import ShipmentsDialog from '../components/dialogs/shipment'
import ShopDialog from '../components/dialogs/shop-details-dialog'

import { useAppSelector, useAppDispatch } from '../hooks/redux'

import { startProducing, endProducing } from '../slices/farms'
import {
  toggleFarmDetailsModal,
  toggleWarehouseDetailsModal,
  toggleTransportsModal,
  toggleShipmentModal,
  toggleShopModal,
} from '../slices/ui'
import { addShipment, deleteShipment } from '../slices/shipments'

export default function DialogsController() {
  const dispatch = useAppDispatch()
  const {
    farmDetailsId,
    warehouseDetailsId,
    shopDetailsId,
    isTransportModal,
    isShipmentModal,
  } = useAppSelector((state) => state.ui)
  const day = useAppSelector((state) => state.day)
  const farms = useAppSelector((state) => state.farms)
  const warehouses = useAppSelector((state) => state.warehouses)
  const transports = useAppSelector((state) => state.transports)
  const shipments = useAppSelector((state) => state.shipments)

  const selectedWarehouse = warehouses.find(
    (item) => item.id === warehouseDetailsId
  )
  const selectedFarm = farms.find((item) => item.id === farmDetailsId)

  return (
    <>
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
      <ShopDialog
        isOpen={Boolean(shopDetailsId)}
        onClose={() => dispatch(toggleShopModal(undefined))}
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
              })
            )
          },
          [dispatch]
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
    </>
  )
}
