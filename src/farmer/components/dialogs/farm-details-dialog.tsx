import { useMemo, useState, memo, useEffect } from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'

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

import entities from '../../data/items'
import FarmIcon from '../../icons/buildings/farm'

import ProductItem from '../products'
import { Farm, FarmProducing } from '../../types/buildings'
import { Day } from '../../types'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

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
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 justify-start">
        {possibleItemsId.map((itemId) => (
          <ProductItem
            key={itemId}
            itemId={itemId}
            hasRing={itemId === selectedProductId}
            onClick={() => onProductChange(itemId)}
          />
        ))}
      </div>

      <ul className="text-sm">
        <li className="flex justify-between">
          <strong>Growth period:</strong>
          <span>
            {entities[selectedProductId].growthTime[0]}
            &nbsp;&ndash;&nbsp;{entities[selectedProductId].growthTime[1]} days
          </span>
        </li>
        <li className="flex justify-between">
          <strong>Produce cost:</strong>
          <span>{entities[selectedProductId].produceCost} / day</span>
        </li>
      </ul>

      <Separator />

      <div className="grid grid-cols-3 gap-2 items-center">
        <Label>Cycles count:</Label>
        <div className="col-span-2 flex gap-1 justify-between">
          {[1, 3, 5, CYCLES_INF].map((item) => {
            return (
              <Button
                key={item}
                onClick={() => onCycleChange(item.toString())}
                size="icon"
                variant={item.toString() === cycles ? 'default' : 'secondary'}
              >
                {item === CYCLES_INF ? <>&infin;</> : item}
              </Button>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 items-center py-2">
        <Label>Power:</Label>

        <div className="col-span-2">
          <SliderPrimitive.Root
            className={cn(
              'relative flex w-full touch-none select-none items-center'
            )}
            defaultValue={[Number(power)]}
            max={8}
            min={1}
            step={1}
            onValueChange={(value) => onPowerChange(value[0].toString())}
          >
            <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
              <SliderPrimitive.Range className="absolute h-full bg-primary" />
            </SliderPrimitive.Track>
            <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
          </SliderPrimitive.Root>
          <div className="flex justify-between mt-2 px-1.5">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="font-semibold text-[10px]">
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* <Select
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
        </Select> */}
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

function ActualProducing({
  producing,
  day,
}: {
  producing: FarmProducing
  day: Day
}) {
  return (
    <div className="border border-border p-2 bg-green-600/10 flex gap-2 items-start rounded-sm">
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
          <li>
            <b>End in:</b> {producing.endDay - day} days
          </li>
        </ul>
      </div>
    </div>
  )
}

type Props = {
  isOpen: boolean
  item?: Farm
  day: Day
  warehouses: { id: string; name: string }[]
  onClose: () => void
  onApply: (data: {
    productId: string
    power: number
    cycles: number | undefined
    warehouseId: string
  }) => void
  onStop: () => void
}
const arePropsEqual = (prevProps: Props, nextProps: Props) => {
  if (
    JSON.stringify(prevProps.isOpen) === JSON.stringify(nextProps.isOpen) &&
    prevProps.isOpen === false
  ) {
    return true
  }
  return false
}

export default memo(function BuildingDetailsDialog({
  isOpen,
  item,
  warehouses = [],
  day,
  onClose,
  onApply,
  onStop,
}: Props) {
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

  // console.warn('BuildingDetailsDialog', {
  //   selectedProductId,
  //   selectedWarehouseId,
  //   cycles,
  //   power,
  //   producing,
  //   day,
  // })

  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="sm:max-w-[560px]"
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
                <ActualProducing day={day} producing={producing} />
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
}, arePropsEqual)
