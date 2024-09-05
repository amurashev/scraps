/* eslint-disable camelcase, no-underscore-dangle */

import { useEffect, useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'

import { RESTAURANT_PRODUCTS_SHOTS_QUERYResult } from '../../../sanity.types'
import { Order } from '../types'

type FixedItems = { id: string; count: number }[]

function OrderItem({
  productsObject,
  order,
  onFinishClick,
}: {
  productsObject: Record<string, RESTAURANT_PRODUCTS_SHOTS_QUERYResult[0]>
  order: Order
  onFinishClick: () => void
}) {
  const [finishedItems, setFinishedItems] = useState<string[]>([])

  const { items } = order || {}
  const itemsArray: FixedItems = useMemo(() => {
    try {
      return JSON.parse(items)
    } catch {
      return ''
    }
  }, [items])

  const finishItem = (id: string) => {
    setFinishedItems([...finishedItems, id])
  }

  const returnItem = (id: string) => {
    setFinishedItems(finishedItems.filter((item) => item !== id))
  }

  useEffect(() => {
    setFinishedItems([])
  }, [order.id])

  return (
    <div className="flex flex-col gap-3">
      <ul className="divide-y divide-border divide-dashed flex flex-col">
        {itemsArray.map((item) => (
          <li key={item.id} className="flex gap-3 items-center w-full py-3">
            <div className="flex-1 flex items-end gap-2">
              <div>
                {productsObject[item.id].title} x <b>{item.count}</b>
              </div>
            </div>
            {finishedItems.includes(item.id) ? (
              <Button variant="destructive" onClick={() => returnItem(item.id)}>
                Remove
              </Button>
            ) : (
              <Button variant="outline" onClick={() => finishItem(item.id)}>
                Add
              </Button>
            )}
          </li>
        ))}
      </ul>
      <Button
        className="w-full"
        onClick={onFinishClick}
        disabled={itemsArray.length !== finishedItems.length}
      >
        Finish Order
      </Button>
    </div>
  )
}

export function OrderDetails({
  productsObject,
  order,
  onFinishClick,
}: {
  productsObject: Record<string, RESTAURANT_PRODUCTS_SHOTS_QUERYResult[0]>
  order?: Order
  onFinishClick: () => void
}) {
  const fixedId = order ? (order.id + 10000).toString().slice(-4) : ''

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">
        Order details {fixedId ? `#${fixedId}` : ''}
      </h2>
      {order ? (
        <OrderItem
          order={order}
          productsObject={productsObject}
          onFinishClick={onFinishClick}
        />
      ) : (
        <p>Order is not selected yet</p>
      )}
    </div>
  )
}
