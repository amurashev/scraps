import SidebarLayout from '@/components/layout/sidebar-layout'
import CommonWithHeaderLayout from '../apps/layout'

export default function SettingsLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <CommonWithHeaderLayout>
      <SidebarLayout
        title="Settings"
        pages={[
          {
            url: '/settings/profile',
            label: 'Profile',
          },
          {
            url: '/settings/notifications',
            label: 'Notifications',
          },
        ]}
      >
        {children}
      </SidebarLayout>
    </CommonWithHeaderLayout>
  )
}
