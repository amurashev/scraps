import Link from 'next/link'

export function IconButton({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick: () => void
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      className="cursor-pointer p-3 rounded-sm hover:bg-muted flex items-center gap-2"
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
