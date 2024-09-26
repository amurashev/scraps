import { memo } from 'react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import ShopIcon from '../../icons/buildings/shop'
import ProductCard from '../cards/product'

export default memo(function ShopDetailsDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const consumption = [
    { itemId: '1', value: 50 },
    { itemId: '2', value: 100 },
    { itemId: '3', value: 75 },
  ]
  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="sm:max-w-[525px]"
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
              <ShopIcon size={124} />
            </div>
            <DialogHeader className="font-semibold mt-2">
              <DialogTitle>Shop</DialogTitle>
            </DialogHeader>
          </div>
          <div className="pl-4">
            <div className="flex flex-col space-y-1">
              {consumption.map((item) => (
                <div className="flex items-center space-x-2">
                  <ProductCard itemId={item.itemId} size="sm" />
                  <span>&nbsp;&mdash;&nbsp;</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
})
