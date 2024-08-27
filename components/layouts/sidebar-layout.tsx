import classNames from 'classnames'

import Menu from '../ui/menu'

export default function SidebarLayout({
  pages,
  title,
  sidebar = '2',
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
  title: string
  sidebar?: '2' | '3'
  pages: {
    url: string
    label: string
  }[]
}) {
  return (
    <section className="w-full min-h-[calc(100vh-60px)] grid grid-cols-12">
      <div
        className={classNames(
          'bg-background col-span-12 border-0 border-b-[1px] border-border',
          'lg:border-b-0 lg:border-r-[1px]',
          {
            'lg:col-span-2': sidebar === '2',
            'lg:col-span-3': sidebar === '3',
          }
        )}
      >
        <div className="space-y-4 py-4 px-3">
          <h2 className="font-bold text-2xl px-2">{title}</h2>
          <div className="hidden lg:block">
            <Menu pages={pages} />
          </div>
        </div>
      </div>
      <div
        className={classNames('bg-background col-span-12', {
          'lg:col-span-10': sidebar === '2',
          'lg:col-span-9': sidebar === '3',
        })}
      >
        {children}
      </div>
    </section>
  )
}
