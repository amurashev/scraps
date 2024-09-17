import SidebarLayout from '@/components/layout/sidebar-layout'
import BaseLayout from '@/components/layout/base'
import { Toaster } from '@/components/ui/toaster'

export default function SettingsLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BaseLayout>
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
      </BaseLayout>
      <Toaster />
    </>
  )
}
