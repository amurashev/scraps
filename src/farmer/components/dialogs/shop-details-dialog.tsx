import { memo, useMemo } from 'react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import ShopIcon from '../../icons/buildings/shop'
import ProductCard from '../cards/product'
import Price from '../ui/price'

import consumption from '../../data/consumption'

export default memo(function ShopDetailsDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const consumptionArray = useMemo(
    () =>
      Object.keys(consumption).map((itemId) => ({
        itemId,
        value: consumption[itemId].value,
        price: consumption[itemId].price,
      })),
    []
  )

  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="sm:max-w-[525px]"
        onClose={onClose}
        onEscapeKeyDown={(e) => {
          e.stopPropagation()
          onClose()
        }}
      >
        <div className="flex divide-x divide-border sm:min-h-[200px]">
          <div className="pr-4 flex flex-col items-center">
            <div className="flex-shrink-0">
              <ShopIcon size={124} />
            </div>
            <DialogHeader className="font-semibold mt-2">
              <DialogTitle>Shop</DialogTitle>
            </DialogHeader>
          </div>
          <div className="pl-4">
            <div className="flex flex-col divide-y divide-border">
              {consumptionArray.map((item) => (
                <div
                  key={item.itemId}
                  className="flex items-center space-x-2 py-2"
                >
                  <ProductCard itemId={item.itemId} size="md" />
                  <div>
                    <ul>
                      <li>
                        Consumption: <strong>{item.value}</strong> items / day
                      </li>
                      <li className="flex items-center">
                        <span>Price per item:</span>&nbsp;
                        <Price value={item.price} />
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
})
