import Link from 'next/link'

export const IconButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick: () => void
}) => {
  return (
    <div
      className="cursor-pointer p-3 rounded-sm hover:bg-muted"
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export const IconLink = ({
  children,
  href,
  target,
}: {
  children: React.ReactNode
  href: string
  target?: '_blank'
}) => {
  return (
    <Link href={href} className="cursor-pointer p-3 rounded-sm hover:bg-muted" target={target}>
      {children}
    </Link>
  )
}
