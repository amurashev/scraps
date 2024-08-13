'use client'

import { FaGithub } from 'react-icons/fa6'
import { FaHouse } from 'react-icons/fa6'
import { FaMoon } from 'react-icons/fa6'
import { FaSun } from 'react-icons/fa6'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'

import pages from '@/constants/pages'

function NavLinks() {
  const [isDark, setIsDark] = useState(false)
  const pathname = usePathname()

  return (
    <header className="flex sticky px-6 h-[60px] top-0 z-50 w-full bg-background/95 backdrop-blur border-0 border-b-[1px] border-solid border-border/50 print:hidden">
      <nav className="hidden md:flex flex-1 items-center gap-6">
        <Link href="/">
          <FaHouse size={24} />
        </Link>
        {pages.map((item) => (
          <Link
            key={item.href}
            className={`transition-colors hover:text-foreground/80 text-foreground/60 ${
              pathname === item.href ? 'font-bold' : ''
            }`}
            href={item.href}
          >
            {item.title}
          </Link>
        ))}
      </nav>
      <div className="flex flex-1 items-center flex-grow md:hidden">Menu</div>
      <div className="flex items-center space-x-5">
        <Link href="https://github.com/amurashev/scraps" target="_blank">
          <FaGithub size={24} />
        </Link>
        <div
          className="cursor-pointer"
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
        </div>
      </div>
    </header>
  )
}

export default NavLinks
