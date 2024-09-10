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
          'bg-background ring-1': isActive,
        },
        'rounded-md px-4 ring-border text-sm hover:bg-background hover:ring-1'
      )}
    >
      <Link className="h-full w-full block py-2" href={url}>
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
      key={index}
      url={url}
      label={components[index].name}
      isActive={isActive}
    />
  )
}

const menuStructure: {
  label: string
  items: (keyof typeof components)[]
}[] = [
  {
    label: 'Messenger',
    items: ['conversation-card', 'chat-message'],
  },
  {
    label: 'Articles',
    items: ['article-card-v-1', 'article-card-v-2'],
  },
  {
    label: 'Jobs',
    items: ['job-card'],
  },
  {
    label: 'Other',
    items: [],
  },
]

export default function Menu() {
  const pathname = usePathname()

  return (
    <ul className="space-y-3">
      {menuStructure
        .filter((group) =>
          group.items.some((item) => !components[item].isHidden)
        )
        .map((group) => (
          <li key={group.label}>
            <MenuHeader label={group.label} />
            <ul>
              {group.items
                .filter((item) => !components[item].isHidden)
                .map((index) => getComponentItem(index, pathname || ''))}
            </ul>
          </li>
        ))}
    </ul>
  )
}
