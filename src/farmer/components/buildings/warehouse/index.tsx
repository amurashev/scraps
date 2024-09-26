import { useMemo, memo } from 'react'

import { cn } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import { Warehouse } from '../../../types/buildings'
import WarehouseIcon from '../../../icons/buildings/warehouse'

export default memo(function WarehouseCell({
  item,
  onClick,
}: {
  item: Warehouse
  onClick: () => void
}) {
  const { name, products } = item

  const capacity = useMemo(
    () => Object.keys(products).reduce((prev, id) => prev + products[id], 0),
    [products]
  )

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger className="w-full h-full">
          <div
            role="button"
            tabIndex={0}
            className={cn(
              'w-full h-full flex items-center justify-center relative p-3 focus-visible:outline-none cursor-pointer',
              {
                'border border-gray-400/30 1shadow-sm 1shadow-[#b4937e] rounded-sm':
                  true,
                'bg-[#c6c6bf]': true,
                'hover:bg-[#c5c4b4]': true,
              }
            )}
            onClick={() => {
              onClick()
            }}
          >
            <WarehouseIcon />
            <div className="flex items-center justify-center absolute bottom-1 right-0 left-0">
              <div className="flex items-center justify-center text-[9px] shadow-sm shadow-gray-200 font-bold bg-background min-w-4 px-1 h-3 rounded-sm">
                {capacity}/{item.capacity}
              </div>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <h3 className="font-bold text-base">{name}</h3>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
})
