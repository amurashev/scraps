import { cn } from '@/lib/utils'

import Menu from './components/menu'

import CommonWithHeaderLayout from '@/components/layout/with-header'

export default function ComponentsLibraryLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <CommonWithHeaderLayout>
      <main>
        <section className="w-full h-[calc(100vh-60px)] flex">
          <div
            className={cn(
              'bg-muted w-[240px] hidden md:block fixed h-full flex-grow border-0 border-b-[1px] border-border',
              'lg:border-b-0 lg:border-r-[1px]'
            )}
          >
            <div className="space-y-3 pt-4">
              <h2 className="font-bold text-2xl px-4">Components</h2>
              <Menu />
            </div>
          </div>
          <div
            className={cn(
              'bg-background flex-grow min-w-1 md:pl-[240px] overflow-x-auto'
            )}
          >
            {children}
          </div>
        </section>
      </main>
    </CommonWithHeaderLayout>
  )
}
