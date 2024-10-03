import { IoTrashOutline } from 'react-icons/io5'

import { Button } from '@/components/ui/button'

import TransportCard from '../../cards/transport'
import ProductCard, { ProductCardBase } from '../../cards/product'
import transportsData from '@/src/farmer/data/transports'

import { getBuildingName } from '@/src/farmer/utils/buildings'

import type { Shipment } from '../../../types/transport'
import type { TransportsObject } from './types'

function ShipmentItem({
  item,
  transportsObject,
  onDeleteClick,
}: {
  item: Shipment
  transportsObject: TransportsObject
  onDeleteClick: () => void
}) {
  const transportType = transportsObject[item.transportId].type
  const transportData = transportsData[transportType]

  const warehouseFromName = getBuildingName(item.from)
  const warehouseToName = getBuildingName(item.to)

  return (
    <div className="py-4">
      <div className="relative flex items-center gap-4 w-full">
        <TransportCard type={transportType} />
        <strong className="font-bold">Transport type {item.transportId}</strong>
        <div className="flex flex-col flex-grow">
          <div className="text-sm">{warehouseFromName}</div>
          <div className="text-sm">{warehouseToName}</div>
        </div>
        <Button size="icon" variant="destructive" onClick={onDeleteClick}>
          <IoTrashOutline />
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-1">
          <strong>Status:</strong>
          <div>
            {item.status === 'goToP1' &&
              `is heading to the "${warehouseFromName}"`}
            {item.status === 'goToP2' &&
              `is heading to the "${warehouseToName}"`}
            {item.status === 'collectCargo' &&
              `is picking up cargo at the "${warehouseFromName}"`}
            {item.status === 'deliverCargo' &&
              `is unloading up cargo at the "${warehouseToName}"`}
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <strong>Cargo:</strong>
          <div>
            <div className="flex gap-1">
              {Array.from({ length: transportData.capacity }, (_, i) => i).map(
                (i) => {
                  if (item.cargoShipment[i]) {
                    return (
                      <ProductCard
                        key={i}
                        itemId={item.cargoShipment[i].itemId}
                        size="sm"
                      />
                    )
                  }

                  return <ProductCardBase key={i} size="sm" />
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShipmentItem
