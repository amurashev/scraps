/* eslint-disable camelcase, no-underscore-dangle */
import { FaChevronLeft } from 'react-icons/fa6'

import { Button } from '@/components/ui/button'

import { RESTAURANT_PRODUCTS_SHOTS_QUERYResult } from '../../../../../sanity.types'

import { OrderItem } from './order-item'
import { Order } from '../types'

export function OrderList({
  order,
  productsObject,
  totalPrice,
  onItemAdd,
  onItemDelete,
  onProceedClick,
  onBackClick,
}: {
  order: Order
  totalPrice: number
  productsObject: Record<string, RESTAURANT_PRODUCTS_SHOTS_QUERYResult[0]>
  onItemAdd: (id: string) => void
  onItemDelete: (id: string) => void
  onProceedClick: () => void
  onBackClick: () => void
}) {
  const hasOrders = Boolean(Object.keys(order).length) && totalPrice

  return (
    <div className="flex flex-col gap-4">
      <div className="md:hidden">
        <Button
          variant="outline"
          className="self-start gap-2"
          onClick={onBackClick}
        >
          <FaChevronLeft size={16} />
          Back to products
        </Button>
      </div>
      <h2 className="text-2xl font-bold">Current order</h2>
      {hasOrders ? (
        <div className="grid gap-2">
          {Object.keys(order)
            .filter((itemId) => order[itemId].count)
            .map((itemId) => {
              return (
                <OrderItem
                  key={itemId}
                  count={order[itemId].count}
                  item={productsObject[itemId]}
                  onItemAdd={() => onItemAdd(itemId)}
                  onItemDelete={() => onItemDelete(itemId)}
                />
              )
            })}
        </div>
      ) : (
        <p className="text-muted-foreground">Add something</p>
      )}
      <div>
        <div className="text-xl font-bold flex justify-between">
          <span>Total:</span>
          <span>{totalPrice} $</span>
        </div>
      </div>
      <Button
        disabled={!hasOrders}
        variant="default"
        className="w-full"
        onClick={onProceedClick}
      >
        Continue to payment
      </Button>
    </div>
  )
}
