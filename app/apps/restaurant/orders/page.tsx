import RestaurantOrdersPage from '@/src/pages/restaurant-orders'

export const revalidate = 0
export const dynamic = 'force-dynamic'

export default async function Page() {
  return <RestaurantOrdersPage />
}
