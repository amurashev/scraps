import { useState } from 'react'

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import IconPlus from '../../../icons/plus'
import ProductCard, { ProductCardBase } from '../../cards/product'

import DropdownListOfProducts from './products-list'

export default function SelectCargo({
  capacity,
  cargoSlots,
  onSelectItem,
}: {
  capacity: number
  cargoSlots: Record<string, string | null>
  onSelectItem: (slotIndex: number, productId: string | null) => void
}) {
  const [openedItem, setOpenedItem] = useState<null | number>(null)

  return (
    <div className="col-span-2 grid grid-cols-4 gap-2">
      {Array.from({ length: capacity }, (_, i) => i + 1).map((slotIndex) => (
        <DropdownMenu open={openedItem === slotIndex} key={slotIndex}>
          <DropdownMenuTrigger asChild key={slotIndex}>
            {cargoSlots[slotIndex] ? (
              <ProductCard
                key={slotIndex}
                itemId={cargoSlots[slotIndex]}
                onClick={() => onSelectItem(slotIndex, null)}
              />
            ) : (
              <ProductCardBase
                key={slotIndex}
                onClick={() => setOpenedItem(slotIndex)}
              >
                <IconPlus fill="#aaaaaa" size={32} />
              </ProductCardBase>
            )}
          </DropdownMenuTrigger>
          <DropdownListOfProducts
            onSelectItem={(productId) => {
              onSelectItem(slotIndex, productId)
              setOpenedItem(null)
            }}
            onInteractOutside={() => {
              setOpenedItem(null)
            }}
          />
        </DropdownMenu>
      ))}
    </div>
  )
}
