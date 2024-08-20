/* eslint-disable camelcase, no-underscore-dangle */

import { Card } from '@/components/ui/card'
import { Sheet, SheetContent, SheetHeader } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'

import { RESTAURANT_PRODUCTS_SHOTS_QUERYResult } from '../../../../../sanity.types'

import { Order } from '../types'

export function PaymentDrawer({
  totalPrice,
  isOpen,
  order,
  productsObject,
  onOpenChange,
  onContinue,
}: {
  totalPrice: number
  isOpen: boolean
  productsObject: Record<string, RESTAURANT_PRODUCTS_SHOTS_QUERYResult[0]>
  order: Order
  onOpenChange: () => void
  onContinue: (type: 'card' | 'cash') => void
}) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader className="space-y-3">
          <h2 className="text-2xl font-bold">Order details</h2>
          <Separator />

          <div className="grid gap-1">
            {Object.keys(order)
              .filter((itemId) => order[itemId].count)
              .map((itemId) => {
                return (
                  <div className="flex gap-1 w-full" key={itemId}>
                    <div className="flex-grow">
                      {productsObject[itemId].title}
                    </div>
                    <div>{productsObject[itemId].price} $</div>
                  </div>
                )
              })}
          </div>
          <Separator />
          <div>
            <div className="text-lg font-bold flex justify-between">
              <span>Total:</span>
              <span>{totalPrice} $</span>
            </div>
          </div>
          <h2 className="text-lg font-bold">How you would like to pay?</h2>
          <div className="grid grid-cols-2 gap-4">
            <Card
              className="h-[100px] bg-foreground text-background flex items-center justify-center cursor-pointer font-bold"
              onClick={() => onContinue('card')}
            >
              By Card
            </Card>
            <Card
              className="h-[100px] bg-foreground text-background flex items-center justify-center cursor-pointer font-bold"
              onClick={() => onContinue('cash')}
            >
              By Cash
            </Card>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
