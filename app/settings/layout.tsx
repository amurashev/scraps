import classNames from 'classnames'

import Menu from './components/menu'

export default function SettingsLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section className="w-full h-[calc(100vh-60px)] grid grid-cols-12">
      <div
        className={classNames(
          'bg-background h-full col-span-12 border-0 border-r-[1px] border-border',
          'md:col-span-3'
        )}
      >
        <div className="space-y-4 py-4 px-3">
          <h2 className="font-bold text-2xl px-2">Settings</h2>
          <Menu />
        </div>
      </div>
      <div
        className={classNames(
          'bg-background h-full col-span-12',
          'md:col-span-9'
        )}
      >
        {children}
      </div>
    </section>
  )
}
