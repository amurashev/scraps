import ComponentsLibraryLayout from '@/src/pages/components-library/layout'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <ComponentsLibraryLayout>{children}</ComponentsLibraryLayout>
}
