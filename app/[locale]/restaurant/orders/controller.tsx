'use client'

/* eslint-disable camelcase, no-underscore-dangle */

import { useMemo, useState } from 'react'

import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/use-toast'

import { putOrder } from '@/lib/endpoints/orders'
import { RESTAURANT_PRODUCTS_SHOTS_QUERYResult } from '../../../../sanity.types'

import { OrderItem } from './components/order-item'
import { OrderDetails } from './components/order-details'
import { Order } from './types'

export default function Controller({
  orders: defaultOrders,
  productsObject,
}: {
  orders: Order[]
  productsObject: Record<string, RESTAURANT_PRODUCTS_SHOTS_QUERYResult[0]>
}) {
  const { toast } = useToast()
  const [orders, setOrders] = useState(defaultOrders)
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)

  const selectedOrder = useMemo(
    () => orders.find((item) => item.id === selectedOrderId),
    [selectedOrderId, orders]
  )
  const newOrders = useMemo(
    () => orders.filter((item) => item.status === 'new'),
    [orders]
  )
  const finishedOrders = useMemo(
    () => orders.filter((item) => item.status === 'done'),
    [orders]
  )

  const finishOrder = async () => {
    try {
      const { data, error } = await putOrder({
        id: selectedOrderId as string,
        status: 'done',
      })

      if (error) {
        toast({
          description: error,
          variant: 'destructive',
        })
      }

      if (data) {
        setSelectedOrderId(null)
        setOrders(orders.map((item) => (item.id === data.id ? data : item)))
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="w-full h-[calc(100vh-60px)] md:grid md:grid-cols-12 bg-muted">
      <div className="md:col-span-8 p-6 gap-6 flex flex-col">
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-bold">New Orders</h2>
          <ul className="flex flex-wrap gap-2">
            {newOrders.map((item) => (
              <OrderItem
                key={item.id}
                item={item}
                isFinished={false}
                isSelected={item.id === selectedOrderId}
                onClick={() => setSelectedOrderId(item.id)}
              />
            ))}
          </ul>
        </div>
        <Separator />
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-bold">Finished Orders</h2>
          <ul className="flex flex-wrap gap-2">
            {finishedOrders.map((item) => (
              <OrderItem
                key={item.id}
                item={item}
                isFinished
                isSelected={item.id === selectedOrderId}
                onClick={() => setSelectedOrderId(item.id)}
              />
            ))}
          </ul>
        </div>
      </div>
      <div className="md:col-span-4 p-6">
        <OrderDetails
          productsObject={productsObject}
          order={selectedOrder}
          onFinishClick={finishOrder}
        />
      </div>
    </div>
  )
}
