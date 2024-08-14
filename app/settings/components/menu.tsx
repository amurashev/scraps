'use client'

import classNames from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const subPages = [
  {
    index: 'profile',
    label: 'Profile',
  },
  {
    index: 'notifications',
    label: 'Notifications',
  },
]

export default function Menu() {
  const pathname = usePathname()

  return (
    <nav className={classNames('flex flex-col space-y-2')}>
      {subPages.map((item) => {
        const href = `/settings/${item.index}`
        return (
          <Link
            className={classNames(
              'inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-9 px-4 py-2 justify-start',
              'hover:text-accent-foreground',
              'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
              {
                'bg-muted': pathname === href,
                'hover:underline': pathname !== href,
              }
            )}
            href={href}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
