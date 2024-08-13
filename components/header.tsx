'use client'
import classNames from 'classnames'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { FaGithub, FaHouse, FaMoon, FaSun } from 'react-icons/fa6'

import pages from '@/constants/pages'
import { IconButton, IconLink } from '@/components/ui/icon-button'

function Header() {
  const [isDark, setIsDark] = useState(false)
  const pathname = usePathname()

  return (
    <header className="flex sticky px-6 h-[60px] top-0 z-50 w-full bg-background/95 backdrop-blur border-0 border-b-[1px] border-solid border-border print:hidden">
      <nav className="hidden md:flex flex-1 items-center gap-6">
        <Link href="/">
          <FaHouse size={18} />
        </Link>
        {pages.map((item) => (
          <Link
            key={item.href}
            className={classNames(
              'transition-colors h-full flex items-center',
              'hover:border-primary',
              'border-0 border-b-2 border-solid',
              {
                'font-bold': pathname === item.href,
                'border-primary': pathname == item.href,
                'border-transparent': pathname !== item.href,
              }
            )}
            href={item.href}
          >
            {item.title}
          </Link>
        ))}
      </nav>
      <div className="flex flex-1 items-center flex-grow md:hidden">Menu</div>
      <div className="flex items-center space-x-1">
        <IconLink href="https://github.com/amurashev/scraps" target="_blank">
          <FaGithub size={24} />
        </IconLink>

        <IconButton
          onClick={() => {
            if (!document.documentElement.classList.contains('dark')) {
              document.documentElement.classList.add('dark')
              setIsDark(true)
            } else {
              document.documentElement.classList.remove('dark')
              setIsDark(false)
            }
          }}
        >
          {isDark ? <FaSun size={24} /> : <FaMoon size={24} />}
        </IconButton>
      </div>
    </header>
  )
}

export default Header
