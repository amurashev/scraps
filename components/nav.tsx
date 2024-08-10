'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { Button } from './ui/button'

const pages = [
  { label: 'Index', href: '/' },
  { label: 'CV', href: '/cv' },
  { label: 'Login', href: '/login' },
]

function NavLinks() {
  const pathname = usePathname()

  return (
    <header className="flex sticky px-4 py-3 top-0 z-50 w-full bg-background/95 backdrop-blur border-0 border-b-[1px] border-solid border-border/50 print:hidden">
      <nav className="flex flex-1 items-center gap-6">
        {pages.map((item) => (
          <Link
            key={item.href}
            className={`transition-colors hover:text-foreground/80 text-foreground/60 ${
              pathname === item.href ? 'font-bold' : ''
            }`}
            href={item.href}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <Button
        id="colorMode"
        onClick={(e) => {
          if (!document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.add('dark')
            e.currentTarget.setHTMLUnsafe('Light')
          } else {
            document.documentElement.classList.remove('dark')
            e.currentTarget.setHTMLUnsafe('Dark')
          }
        }}
      >
        Dark
      </Button>
    </header>
  )
}

export default NavLinks
