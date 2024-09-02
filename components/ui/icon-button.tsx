import { MouseEvent } from 'react'

import Link from 'next/link'

import { cn } from '@/lib/utils'

export function IconButton({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode
  className?: string
  onClick: (e: MouseEvent<HTMLDivElement>) => void
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      className={cn(
        'cursor-pointer p-3 rounded-sm hover:bg-muted flex items-center gap-2',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export function IconLink({
  children,
  href,
  target,
}: {
  children: React.ReactNode
  href: string
  target?: '_blank'
}) {
  return (
    <Link
      href={href}
      className="cursor-pointer p-3 rounded-sm hover:bg-muted"
      target={target}
    >
      {children}
    </Link>
  )
}
