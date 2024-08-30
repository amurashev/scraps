'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { componentPageRoute } from '@/constants/routes'

import { components } from '../data'

function ComponentLinkItem({
  label,
  url,
  isActive,
}: {
  label: string
  url: string
  isActive?: boolean
}) {
  return (
    <li
      className={cn(
        {
          'bg-border': isActive,
        },
        'py-2 px-4 text-sm'
      )}
    >
      <Link className="h-full w-full block" href={url}>
        {label}
      </Link>
    </li>
  )
}

function MenuHeader({ label }: { label: string }) {
  return <h4 className="text-muted-foreground py-2 px-4 text-sm">{label}</h4>
}

const getComponentItem = (index: keyof typeof components, pathname: string) => {
  const url = componentPageRoute.getUrl({
    params: {
      slug: index,
    },
  })
  const isActive = pathname.includes(url)

  return (
    <ComponentLinkItem
      url={url}
      label={components[index].name}
      isActive={isActive}
    />
  )
}

export default function Menu() {
  const pathname = usePathname()

  return (
    <ul className="space-y-3">
      <li>
        <MenuHeader label="Messenger" />
        <ul>
          {(
            ['conversation-card', 'chat-message'] as (keyof typeof components)[]
          ).map((index) => getComponentItem(index, pathname))}
        </ul>
      </li>
      <li>
        <MenuHeader label="Other" />
        <ul>
          <ul>
            {(['job-card'] as (keyof typeof components)[]).map((index) =>
              getComponentItem(index, pathname)
            )}
          </ul>
        </ul>
      </li>
    </ul>
  )
}
