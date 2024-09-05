'use client'

/* eslint-disable camelcase, no-underscore-dangle */

import { OrderStat } from './components/orders-chart'
import { ProductStat } from './components/product-chart'

export default function Controller({
  productsStat,
  orderStat,
}: {
  productsStat: { title: string; count: number }[]
  orderStat: { date: string; count: number }[]
}) {
  return (
    <div className="w-full h-full bg-muted p-6 flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-4">
        <ProductStat data={productsStat} />
        <OrderStat data={orderStat} />
      </div>
    </div>
  )
}
