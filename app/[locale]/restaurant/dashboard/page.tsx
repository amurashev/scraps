/* eslint-disable camelcase, no-underscore-dangle */

import Controller from './controller'

import { RESTAURANT_PRODUCTS_SHOTS_QUERY } from '@/sanity/lib/queries'

import { sanityFetch } from '@/sanity/lib/client'
import { RESTAURANT_PRODUCTS_SHOTS_QUERYResult } from '../../../../sanity.types'
import { getOrders } from '@/lib/endpoints/orders'

export const revalidate = 0
export const dynamic = 'force-dynamic'

export default async function Page() {
  const { data: orders } = await getOrders()

  const products = await sanityFetch<RESTAURANT_PRODUCTS_SHOTS_QUERYResult>({
    query: RESTAURANT_PRODUCTS_SHOTS_QUERY,
  })

  const productsObject: Record<
    string,
    RESTAURANT_PRODUCTS_SHOTS_QUERYResult[0]
  > = {}

  products.forEach((item) => {
    productsObject[item._id] = item
  })

  const productsStatObject: Record<string, number> = {}
  const orderStatObject: Record<string, number> = {}

  if (orders) {
    orders?.forEach((order) => {
      const { items, created_at } = order
      let itemsArray: { id: string; count: number }[] = []

      try {
        itemsArray = JSON.parse(items)
      } catch {
        //
      }

      itemsArray.forEach((product) => {
        if (!productsStatObject[product.id]) productsStatObject[product.id] = 0

        productsStatObject[product.id] += 1
      })

      const date = created_at.slice(0, 10)
      if (!orderStatObject[date]) orderStatObject[date] = 0
      orderStatObject[date] += 1
    })
  }

  const productsStat = Object.keys(productsStatObject).map((id) => ({
    title: productsObject[id].title || '',
    count: productsStatObject[id],
  }))

  const orderStat = Object.keys(orderStatObject).map((date) => ({
    date,
    count: orderStatObject[date],
  }))

  productsStat.sort((a, b) => b.count - a.count)
  orderStat.sort((a, b) => Number(new Date(a.date)) - Number(new Date(b.date)))

  return (
    <Controller
      productsStat={productsStat}
      orderStat={orderStat}
    />
  )
}
