/* eslint-disable camelcase, no-underscore-dangle */
import {
  RESTAURANT_CATEGORIES_QUERY,
  RESTAURANT_PRODUCTS_SHOTS_QUERY,
} from '@/sanity/lib/queries'

import { sanityFetch } from '@/sanity/lib/client'
import {
  RESTAURANT_CATEGORIES_QUERYResult,
  RESTAURANT_PRODUCTS_SHOTS_QUERYResult,
} from '../../sanity.types'
import Controller from './controller'

export const dynamic = 'force-dynamic'

export default async function RestaurantMenuPage() {
  const categories = await sanityFetch<RESTAURANT_CATEGORIES_QUERYResult>({
    query: RESTAURANT_CATEGORIES_QUERY,
  })

  const products = await sanityFetch<RESTAURANT_PRODUCTS_SHOTS_QUERYResult>({
    query: RESTAURANT_PRODUCTS_SHOTS_QUERY,
  })

  return <Controller categories={categories} products={products} />
}
