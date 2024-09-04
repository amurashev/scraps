'use client'

import classNames from 'classnames'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { FaGithub, FaMoon, FaSun } from 'react-icons/fa6'

import { IconButton, IconLink } from '@/components/ui/icon-button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { buttonVariants } from '@/components/ui/button'

import { logout } from '@/app/actions/auth'

type Props = {
  user?: {
    firstName: string
    lastName: string
  }
}

function Header(props: Props = {}) {
  const { user } = props
  const [isDark, setIsDark] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/' || pathname === '/en' // TODO:

  if (pathname.includes('/login')) {
    return null // TODO: Dirty fix ;(
  }

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
              'font-bold': pathname.includes('components'),
              'border-primary': pathname.includes('components'),
              'border-transparent': !pathname.includes('components'),
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
      <div className="flex items-center ml-3">
        {user ? (
          <NavigationMenu align="right">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <Avatar type="circle" size={10}>
                    <AvatarImage src="" />
                    <AvatarFallback>
                      {user.firstName.charAt(0)}
                      {user.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[200px] flex flex-col divide-y divide-border divide-dashed">
                    <Link
                      href="/settings"
                      legacyBehavior
                      passHref
                      className="block w-full"
                    >
                      <NavigationMenuLink className="px-4 py-3 hover:bg-muted">
                        Settings
                      </NavigationMenuLink>
                    </Link>
                    <NavigationMenuLink
                      onClick={() => logout()}
                      className="px-4 py-3 hover:bg-muted"
                    >
                      Logout
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        ) : (
          <Link
            href="/login"
            className={buttonVariants({ variant: 'default', size: 'sm' })}
          >
            Login
          </Link>
        )}
      </div>
    </header>
  )
}

export default Header
