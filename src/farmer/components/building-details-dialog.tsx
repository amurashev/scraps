import { useMemo, useState, memo, useEffect } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'

import entities from '../data/items'
import FarmIcon from '../icons/buildings/farm'

import ProductItem from './products'
import { Farm, FarmProducing } from '../types/buildings'

const CYCLES_INF = 'inf'

function AddProducingForm({
  selectedProductId,
  selectedWarehouseId,
  power,
  cycles,
  warehouses,
  onProductChange,
  onCycleChange,
  onPowerChange,
  onWarehouseChange,
}: {
  selectedProductId: string
  selectedWarehouseId: string
  cycles: string
  power: string
  warehouses: { id: string; name: string }[]
  onProductChange: (id: string) => void
  onCycleChange: (id: string) => void
  onPowerChange: (id: string) => void
  onWarehouseChange: (id: string) => void
}) {
  const possibleItemsId = useMemo(
    () =>
      Object.keys(entities)
        .filter((id) => entities[id])
        .map((id) => id),
    []
  )

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        {possibleItemsId.map((itemId) => (
          <ProductItem
            key={itemId}
            itemId={itemId}
            hasRing={itemId === selectedProductId}
            onClick={() => onProductChange(itemId)}
          />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2 items-center">
        <Label>Cycles count:</Label>
        <Select
          value={cycles?.toString()}
          onValueChange={(value) => onCycleChange(value)}
        >
          <SelectTrigger className="col-span-2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[1, 3, 5, CYCLES_INF].map((item) => (
              <SelectItem key={item} value={item ? item.toString() : ''}>
                {item === CYCLES_INF ? 'Infinity' : item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-3 gap-2 items-center">
        <Label>Power:</Label>
        <Select
          value={power.toString()}
          onValueChange={(value) => onPowerChange(value)}
        >
          <SelectTrigger className="col-span-2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <SelectItem key={item} value={item.toString()}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-3 gap-2 items-center">
        <Label>Warehouse:</Label>
        <Select
          value={selectedWarehouseId}
          onValueChange={(value) => onWarehouseChange(value)}
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
    </div>
  )
}

function ActualProducing({ producing }: { producing: FarmProducing }) {
  return (
    <div className="border border-border p-2 flex gap-2 items-center rounded-sm">
      <ProductItem itemId={producing.productId} />
      <div>
        <ul className="text-sm">
          <li>
            <b>Produces:</b> {entities[producing.productId].name}
          </li>
          <li>
            <b>Cycles:</b> {!producing.cycles ? 'Infinity' : producing.cycles}
          </li>
          <li>
            <b>Power:</b> {producing.power}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default memo(function BuildingDetailsDialog({
  isOpen,
  item,
  warehouses = [],
  onClose,
  onApply,
  onStop,
}: {
  isOpen: boolean
  item?: Farm
  warehouses: { id: string; name: string }[]
  onClose: () => void
  onApply: (data: {
    productId: string
    power: number
    cycles: number | undefined
    warehouseId: string
  }) => void
  onStop: () => void
}) {
  const [selectedProductId, setSelectedProductId] = useState<string>('')
  const [selectedWarehouseId, setSelectedWarehouseId] = useState('1')
  const [cycles, setCycles] = useState<number | 'inf'>(1)
  const [power, setPower] = useState(1)

  const applyProduction = () => {
    const correctCycles = cycles === CYCLES_INF ? undefined : cycles
    onApply({
      productId: selectedProductId,
      cycles: correctCycles,
      power,
      warehouseId: selectedWarehouseId,
    })
  }

  useEffect(() => {
    if (isOpen) {
      setSelectedProductId('1')

      if (warehouses.length) {
        setSelectedWarehouseId(warehouses[0].id)
      }
    }
  }, [isOpen, warehouses])

  const { name, producing } = item || {}

  console.warn('BuildingDetailsDialog', {
    selectedProductId,
    selectedWarehouseId,
    cycles,
    power,
    producing,
  })

  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="sm:max-w-[540px]"
        onClose={onClose}
        onEscapeKeyDown={(e) => {
          e.stopPropagation()
          onClose()
        }}
        // data-test="jobs_applyDialog"
      >
        <div className="flex divide-x divide-border">
          <div className="pr-4 flex flex-col items-center">
            <div className="flex-shrink-0">
              <FarmIcon size={124} />
            </div>
            <DialogHeader className="font-semibold mt-2">
              <DialogTitle>{name}</DialogTitle>
            </DialogHeader>
          </div>
          <div className="pl-4 flex-grow">
            {producing ? (
              <div>
                <ActualProducing producing={producing} />
              </div>
            ) : (
              <AddProducingForm
                selectedProductId={selectedProductId}
                selectedWarehouseId={selectedWarehouseId}
                cycles={cycles.toString()}
                power={power.toString()}
                warehouses={warehouses}
                onCycleChange={(value) => setCycles(value as number | 'inf')}
                onPowerChange={(value) => setPower(Number(value))}
                onProductChange={(value) => {
                  setSelectedProductId(value)
                }}
                onWarehouseChange={(value) => setSelectedWarehouseId(value)}
              />
            )}

            {/* <Separator /> */}
          </div>
        </div>

        <DialogFooter>
          {/* <Button
            type="submit"
            variant="ghost"
            onClick={() => onClose()}
            // data-test="jobs_applyDialog_submit"
          >
            Close
          </Button> */}
          {!producing && (
            <Button
              type="submit"
              onClick={() => applyProduction()}
              // data-test="jobs_applyDialog_submit"
            >
              Start production
            </Button>
          )}
          {producing && (
            <Button
              type="submit"
              variant="destructive"
              onClick={() => onStop()}
              // data-test="jobs_applyDialog_submit"
            >
              Stop production
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
})
