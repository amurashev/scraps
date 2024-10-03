import { useState, memo, useEffect } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import FarmIcon from '../../../icons/buildings/farm'

import { Farm } from '../../../types/buildings'
import { Day } from '../../../types'
import { getBuildingName } from '../../../utils/buildings'

import ActualProducing from './actual-producing'
import AddProducingForm from './add-form'

const CYCLES_INF = 'inf'

type Props = {
  id: string
  isOpen: boolean
  item?: Farm
  day: Day
  warehouses: { id: string; name?: string }[]
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
  id,
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

  const name = id ? getBuildingName(id) : ''

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

  const { producing } = item || {}

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
          </div>
        </div>

        <DialogFooter>
          {!producing && (
            <Button type="submit" onClick={() => applyProduction()}>
              Start production
            </Button>
          )}
          {producing && (
            <Button
              type="submit"
              variant="destructive"
              onClick={() => onStop()}
            >
              Stop production
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}, arePropsEqual)
