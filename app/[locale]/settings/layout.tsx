import SidebarLayout from '@/components/layouts/sidebar-layout'

export default function SettingsLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
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
  )
}
