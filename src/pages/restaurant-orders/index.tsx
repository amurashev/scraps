/* eslint-disable camelcase, no-underscore-dangle */

import Controller from './controller'

import { RESTAURANT_PRODUCTS_SHOTS_QUERY } from '@/sanity/lib/queries'
import { sanityFetch } from '@/sanity/lib/client'
import { getOrders } from '@/lib/endpoints/orders'
import { RESTAURANT_PRODUCTS_SHOTS_QUERYResult } from '../../../sanity.types'

export const revalidate = 0
export const dynamic = 'force-dynamic'

export default async function RestaurantOrdersPage() {
  const { data: orders = [] } = await getOrders()

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

  orders.sort(
    (a, b) => Number(new Date(a.created_at)) - Number(new Date(b.created_at))
  )

  return <Controller orders={orders || []} productsObject={productsObject} />
}
