import { memo, useEffect, useMemo, useState } from 'react'

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
import ShipmentsIcon from '../../../icons/shipments'

import SelectCargo from './select-cargo'
import ShipmentItem from './item'

import type { Warehouse } from '../../../types/buildings'
import type { Cargo, Shipment, Transport } from '../../../types/transport'
import {
  type WarehousesObject,
  type TransportsObject,
  CargoSlots,
} from './types'

function FormRow({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="grid grid-cols-3 gap-2 items-start">
      <Label className="min-h-[40px] flex items-center">{label}:</Label>
      {children}
    </div>
  )
}

function FormRowWithSelect({
  label,
  value,
  children,
  onChange,
}: {
  label: string
  value: string
  children: React.ReactNode
  onChange: (value: string) => void
}) {
  return (
    <FormRow label={label}>
      <Select value={value} onValueChange={(newValue) => onChange(newValue)}>
        <SelectTrigger className="col-span-2">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>
    </FormRow>
  )
}

const cargoFromSlotsToArray = (cargoSlots: CargoSlots): Cargo[] => {
  return Object.keys(cargoSlots)
    .filter((key) => cargoSlots[key])
    .map((key) => ({
      itemId: cargoSlots[key] as string,
      count: 1,
    }))
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
    cargo: Cargo[]
  }) => void
  onDeleteShipment: (id: string) => void
}) {
  const [isAddForm, setIsAddForm] = useState(true)

  const [selectedWarehouseFromId, setSelectedWarehouseFromId] = useState('2')
  const [selectedWarehouseToId, setSelectedWarehouseToId] = useState('1')
  const [selectedTransportId, setSelectedTransportId] = useState('')
  const [cargoSlots, setCargoSlots] = useState<CargoSlots>({})

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

  useEffect(() => {
    if (selectedTransportId) {
      setCargoSlots({})
    }
  }, [selectedTransportId])

  // console.warn('ShipmentsDialog', shipments, warehousesObject, transportsObject)

  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="sm:max-w-[725px]"
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
                <FormRowWithSelect
                  label="From"
                  value={selectedWarehouseFromId}
                  onChange={(value) => setSelectedWarehouseFromId(value)}
                >
                  {warehouses.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </FormRowWithSelect>

                <FormRowWithSelect
                  label="To"
                  value={selectedWarehouseToId}
                  onChange={(value) => setSelectedWarehouseToId(value)}
                >
                  {warehouses.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </FormRowWithSelect>

                <FormRowWithSelect
                  label="Transport"
                  value={selectedTransportId}
                  onChange={(value) => setSelectedTransportId(value)}
                >
                  {transports.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.id}
                    </SelectItem>
                  ))}
                </FormRowWithSelect>

                {selectedTransportData && (
                  <FormRow label="Cargo">
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
                  </FormRow>
                )}
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
            <Button variant="secondary" onClick={() => setIsAddForm(false)}>
              Return to list
            </Button>
            <Button
              onClick={() => {
                const cargoArray = cargoFromSlotsToArray(cargoSlots)

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
            <Button onClick={() => setIsAddForm(true)}>Add shipment</Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
})
