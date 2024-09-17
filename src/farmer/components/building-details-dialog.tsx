import { useMemo, useState, memo } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/dialog'

import entities from '../data/items'
import FarmIcon from '../icons/buildings/farm'

import ProductItem from './products'
import { Farm } from '../types/buildings'

export default memo(function BuildingDetailsDialog({
  isOpen,
  item,
  onClose,
  onApply,
}: {
  isOpen: boolean
  item?: Farm
  onClose: () => void
  onApply: (productId: string) => void
}) {
  const [selectedProductId, setSelectedProductId] = useState('1') // TODO
  const possibleItemsId = useMemo(
    () =>
      Object.keys(entities)
        .filter((id) => entities[id])
        .map((id) => id),
    []
  )

  const { name } = item || {}

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
        {/* <DialogHeader>
          <DialogTitle>Farm details</DialogTitle>
        </DialogHeader> */}
        {/* <Separator /> */}

        <div className="flex divide-x divide-border sm:min-h-[200px]">
          <div className="pr-4 flex flex-col items-center">
            <div className="flex-shrink-0">
              <FarmIcon size={124} />
            </div>
            <DialogHeader className="font-semibold mt-1">{name}</DialogHeader>
          </div>
          <div className="pl-4">
            <div className="flex gap-3">
              {possibleItemsId.map((itemId) => (
                <ProductItem
                  key={itemId}
                  itemId={itemId}
                  hasRing={itemId === selectedProductId}
                  onClick={() => {
                    setSelectedProductId(itemId)
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* <Separator /> */}

        <DialogFooter>
          {/* <Button
            type="submit"
            variant="ghost"
            onClick={() => onClose()}
            // data-test="jobs_applyDialog_submit"
          >
            Close
          </Button> */}
          <Button
            type="submit"
            onClick={() => onApply(selectedProductId)}
            // data-test="jobs_applyDialog_submit"
          >
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
})
