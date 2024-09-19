import { cn } from '@/lib/utils'

import Coin from '../../../icons/coin'
import entities from '../../../data/products'

// import ItemIcon from '../../products/item-icon'

export default function SeedsDropDown({
  possibleSeedsId,
  availableMoney,
  onClick,
}: {
  possibleSeedsId: string[]
  availableMoney: number
  onClick: (id: string) => void
}) {
  return (
    <div className="p-2">
      <h2 className="font-bold">Seeds</h2>
      <div className="grid grid-cols-2 gap-2 w-full mt-2">
        {possibleSeedsId.map((itemId) => {
          const isPossibleToBuy = availableMoney >= entities[itemId].price

          return (
            <div
              key={itemId}
              role="button"
              tabIndex={0}
              className={cn(
                'w-16 relative h-16 p-2 bg-muted cursor-pointer rounded-sm',
                {
                  'opacity-60': !isPossibleToBuy,
                }
              )}
              onClick={() => {
                if (isPossibleToBuy) {
                  onClick(itemId)
                }
              }}
            >
              {/* <ItemIcon id={itemId} /> */}
              <div className="flex items-center justify-center gap-1 absolute bottom-1 text-[10px] shadow-sm shadow-gray-200 right-1 font-bold bg-background min-w-4 px-1 h-4 rounded-sm">
                <Coin size={10} />
                <span>{entities[itemId].price}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
