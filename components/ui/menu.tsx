'use client'

import classNames from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Menu({
  pages,
}: {
  pages: {
    url: string
    label: string
  }[]
}) {
  const pathname = usePathname()

  return (
    <nav className={classNames('flex flex-col space-y-2')}>
      {pages.map((item) => {
        const isActive = pathname.includes(item.url)
        return (
          <Link
            key={item.url}
            className={classNames(
              'inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-9 px-4 py-2 justify-start',
              'hover:text-accent-foreground',
              'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
              {
                'bg-muted': isActive,
                'hover:underline': !isActive,
              }
            )}
            href={item.url}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
