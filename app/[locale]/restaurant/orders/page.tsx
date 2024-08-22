/* eslint-disable camelcase, no-underscore-dangle */

import Controller from './controller'

import { RESTAURANT_PRODUCTS_SHOTS_QUERY } from '@/sanity/lib/queries'

import { sanityFetch } from '@/sanity/lib/client'
import { RESTAURANT_PRODUCTS_SHOTS_QUERYResult } from '../../../../sanity.types'
import { getOrders } from '@/lib/endpoints/orders'

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

  return <Controller orders={orders || []} productsObject={productsObject} />
}
