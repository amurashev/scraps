import { useMemo, memo } from 'react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import WarehouseIcon from '../../icons/buildings/warehouse'

import ProductItem, { ProductItemCount } from '../products'
import { Warehouse } from '../../types/buildings'

export default memo(function WarehouseDetailsDialog({
  isOpen,
  item,
  onClose,
}: {
  isOpen: boolean
  item?: Warehouse
  onClose: () => void
}) {
  const { name, products = {}, capacity } = item || {}

  const possibleItemsId = useMemo(
    () =>
      Object.keys(products)
        .filter((id) => products[id])
        .map((id) => id),
    [products]
  )

  const currentCapacity = useMemo(
    () => Object.keys(products).reduce((prev, id) => prev + products[id], 0),
    [products]
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
        // data-test="jobs_applyDialog"
      >
        {item && (
          <div className="flex divide-x divide-border sm:min-h-[200px]">
            <div className="pr-4 flex flex-col items-center">
              <div className="flex-shrink-0">
                <WarehouseIcon size={124} />
              </div>
              <DialogHeader className="font-semibold">
                <DialogTitle>{name}</DialogTitle>
              </DialogHeader>

              <div className="font-bold text-xl mt-1">
                {currentCapacity}/{capacity}
              </div>
            </div>
            <div className="pl-4">
              {possibleItemsId.length === 0 ? (
                <div className="h-[100px] flex items-center justify-center text-center">
                  {/* <p className="text-muted-foreground">Empty</p> */}
                </div>
              ) : (
                <div className="flex gap-2">
                  {possibleItemsId.map((itemId) => (
                    <ProductItem key={itemId} itemId={itemId}>
                      <ProductItemCount count={products[itemId]} />
                    </ProductItem>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* <DialogFooter>
          <Button
            type="submit"
            onClick={() => onClose()}
            // data-test="jobs_applyDialog_submit"
          >
            Close
          </Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  )
})
