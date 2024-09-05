import RestaurantDashboardPage from '@/src/pages/restaurant-dashboard'

export const revalidate = 0
export const dynamic = 'force-dynamic'

export default async function Page() {
  return <RestaurantDashboardPage />
}
