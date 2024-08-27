'use client'

import classNames from 'classnames'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { FaGithub, FaMoon, FaSun } from 'react-icons/fa6'

import { IconButton, IconLink } from '@/components/ui/icon-button'

function Header() {
  const [isDark, setIsDark] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/' || pathname === '/en' // TODO:

  return (
    <header className="flex sticky px-6 h-[60px] top-0 z-50 w-full bg-background/95 backdrop-blur border-0 border-b-[1px] border-solid border-border print:hidden">
      <nav className="flex flex-1 items-center gap-6">
        <Link
          className={classNames(
            'transition-colors h-full flex items-center',
            'hover:border-primary',
            'border-0 border-b-2 border-solid',
            {
              'font-bold': isHomePage,
              'border-primary': isHomePage,
              'border-transparent': !isHomePage,
            }
          )}
          href="/"
          locale="en"
        >
          Applications
        </Link>
        <Link
          className={classNames(
            'transition-colors h-full flex items-center',
            'hover:border-primary',
            'border-0 border-b-2 border-solid',
            {
              'font-bold': isHomePage,
              'border-primary': isHomePage,
              'border-transparent': !isHomePage,
            }
          )}
          href="/components"
          locale="en"
        >
          Components
        </Link>
      </nav>
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
