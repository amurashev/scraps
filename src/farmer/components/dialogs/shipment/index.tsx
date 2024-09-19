import { memo, useEffect, useMemo, useState } from 'react'

import { IoTrashOutline } from 'react-icons/io5'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

import transportsData from '../../../data/transports'

import TransportCard from '../../cards/transport'
import ProductCard, { ProductCardBase } from '../../cards/product'
import ShipmentsIcon from '../../../icons/shipments'

import SelectCargo from './select-cargo'

import type { Warehouse } from '@/src/farmer/types/buildings'
import type { Shipment, Transport } from '../../../types/transport'

type WarehousesObject = Record<string, Warehouse>
type TransportsObject = Record<string, Pick<Transport, 'id' | 'type'>>

function ShipmentItem({
  item,
  warehousesObject,
  transportsObject,
  onDeleteClick,
}: {
  item: Shipment
  warehousesObject: WarehousesObject
  transportsObject: TransportsObject
  onDeleteClick: () => void
}) {
  const transportType = transportsObject[item.transportId].type
  // const transportData = transportsData[transportType]

  return (
    <div>
      <div className="relative flex items-center gap-4 py-2 w-full">
        <TransportCard type={transportType} />
        <strong className="font-bold">{item.transportId}</strong>
        <div className="flex flex-col flex-grow">
          <div className="text-sm">{warehousesObject[item.from].name}</div>
          <div className="text-sm">{warehousesObject[item.to].name}</div>
        </div>
        <Button size="icon" variant="destructive" onClick={onDeleteClick}>
          <IoTrashOutline />
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-1">
          <strong>Status:</strong>
          <div>{item.status}</div>
        </div>
        <div className="flex gap-2 items-center">
          <strong>Cargo:</strong>
          <div>
            <div className="flex gap-1">
              {item.cargoPlan.map((cargo, i) => {
                const key = `${i}_${cargo.itemId}`
                if (item.cargoShipment[i]) {
                  return (
                    <ProductCard key={key} itemId={cargo.itemId} size="sm" />
                  )
                }

                return <ProductCardBase key={key} size="sm" />
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(function ShipmentsDialog({
  isOpen,
  shipments,
  transports,
  warehouses,
  onClose,
  onAddShipment,
  onDeleteShipment,
}: {
  isOpen: boolean
  shipments: Shipment[]
  transports: Pick<Transport, 'id' | 'type'>[]
  warehouses: Warehouse[]
  onClose: () => void
  onAddShipment: (data: {
    from: string
    to: string
    transportId: string
    cargo: {
      itemId: string
      count: number
    }[]
  }) => void
  onDeleteShipment: (id: string) => void
}) {
  const [isAddForm, setIsAddForm] = useState(true)

  const [selectedWarehouseFromId, setSelectedWarehouseFromId] = useState('2')
  const [selectedWarehouseToId, setSelectedWarehouseToId] = useState('1')
  const [selectedTransportId, setSelectedTransportId] = useState('')
  const [cargoSlots, setCargoSlots] = useState<Record<string, string | null>>(
    {}
  )

  const selectedTransport = transports.find(
    (item) => item.id === selectedTransportId
  )
  const selectedTransportData = selectedTransport
    ? transportsData[selectedTransport.type]
    : undefined

  const warehousesObject = useMemo(() => {
    const obj: WarehousesObject = {}
    warehouses.forEach((item) => {
      obj[item.id] = item
    })
    return obj
  }, [warehouses])

  const transportsObject = useMemo(() => {
    const obj: TransportsObject = {}
    transports.forEach((item) => {
      obj[item.id] = item
    })
    return obj
  }, [transports])

  useEffect(() => {
    if (isOpen) {
      setIsAddForm(false)
      setCargoSlots({})
    }
  }, [isOpen])

  // console.warn('ShipmentsDialog', shipments, warehousesObject, transportsObject)

  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="sm:max-w-[625px]"
        onClose={onClose}
        onEscapeKeyDown={(e) => {
          e.stopPropagation()
          onClose()
        }}
        // data-test="jobs_applyDialog"
      >
        <div className="flex divide-x divide-border sm:min-h-[200px]">
          <div className="pr-4 flex flex-col items-center">
            <div className="flex-shrink-0">
              <ShipmentsIcon size={124} />
            </div>
            <DialogHeader className="font-semibold mt-3">
              <DialogTitle>Shipments</DialogTitle>
            </DialogHeader>
          </div>
          <div className="pl-4 flex-grow">
            {isAddForm && (
              <div className="mt-2 flex flex-col gap-3">
                <div className="grid grid-cols-3 gap-2 items-center">
                  <Label>From:</Label>
                  <Select
                    value={selectedWarehouseFromId}
                    onValueChange={(value) => setSelectedWarehouseFromId(value)}
                  >
                    <SelectTrigger className="col-span-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {warehouses.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-3 gap-2 items-center">
                  <Label>To:</Label>
                  <Select
                    value={selectedWarehouseToId}
                    onValueChange={(value) => setSelectedWarehouseToId(value)}
                  >
                    <SelectTrigger className="col-span-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {warehouses.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-3 gap-2 items-center">
                  <Label>Transport:</Label>
                  <Select
                    value={selectedTransportId}
                    onValueChange={(value) => setSelectedTransportId(value)}
                  >
                    <SelectTrigger className="col-span-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {transports.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.id}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-3 gap-2 items-start">
                  <Label className="h-[40px] flex items-center">Cargo:</Label>
                  {selectedTransportData && (
                    <SelectCargo
                      capacity={selectedTransportData.capacity}
                      cargoSlots={cargoSlots}
                      onSelectItem={(slotIndex, productId) => {
                        setCargoSlots({
                          ...cargoSlots,
                          [slotIndex.toString()]: productId,
                        })
                      }}
                    />
                  )}
                </div>
              </div>
            )}
            {!isAddForm && (
              <div>
                {shipments.length === 0 ? (
                  <div className="h-[100px] flex items-center justify-center text-center">
                    {/* <p className="text-muted-foreground">Empty</p> */}
                  </div>
                ) : (
                  <div className="flex flex-col divide-y divide-border w-full">
                    {shipments.map((item) => {
                      return (
                        <ShipmentItem
                          key={item.id}
                          item={item}
                          warehousesObject={warehousesObject}
                          transportsObject={transportsObject}
                          onDeleteClick={() => onDeleteShipment(item.id)}
                        />
                      )
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        {isAddForm && (
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => {
                setIsAddForm(false)
              }}
            >
              Return to list
            </Button>
            <Button
              onClick={() => {
                const cargoArray = Object.keys(cargoSlots)
                  .filter((key) => cargoSlots[key])
                  .map((key) => ({
                    itemId: cargoSlots[key] as string,
                    count: 1,
                  }))
                onAddShipment({
                  from: selectedWarehouseFromId,
                  to: selectedWarehouseToId,
                  transportId: selectedTransportId,
                  cargo: cargoArray,
                })
                setIsAddForm(false)
              }}
            >
              Add shipment
            </Button>
          </DialogFooter>
        )}
        {!isAddForm && (
          <DialogFooter>
            <Button
              // variant="secondary"
              onClick={() => {
                setIsAddForm(true)
              }}
            >
              Add shipment
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
})
