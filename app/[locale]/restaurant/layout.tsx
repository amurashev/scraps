import SidebarLayout from '@/components/layout/sidebar-layout'
import {
  restaurantOrdersRoute,
  restaurantDashboardRoute,
  restaurantMenuRoute,
} from '@/constants/routes'

export default function SettingsLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarLayout
      title="Restaurant"
      pages={[
        {
          url: restaurantMenuRoute.getUrl(),
          label: 'Menu',
        },
        {
          url: restaurantOrdersRoute.getUrl(),
          label: 'Orders',
        },
        {
          url: restaurantDashboardRoute.getUrl(),
          label: 'Dashboard',
        },
      ]}
    >
      {children}
    </SidebarLayout>
  )
}
