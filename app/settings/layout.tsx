import SettingsLayout from '@/src/settings/layout'

export default function Layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return <SettingsLayout>{children}</SettingsLayout>
}
