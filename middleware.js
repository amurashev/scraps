import { NextResponse } from 'next/server'

import { i18n } from './i18n-config'
import { verifySession } from '@/lib/session'

const l18nExceptions = [
  '/studio',
  '/api',
  '/actions',
  '/components',
  '/images',
  '/share',
]

const publicRoutes = ['/login', '/signup']

export async function middleware(request) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl

  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  const noNeedTol18n = l18nExceptions.some(
    (path) => pathname.startsWith(path) || pathname === path
  )

  if (pathnameHasLocale || noNeedTol18n) return

  const userId = await verifySession()

  // 6. Redirect to /dashboard if the user is authenticated
  const isPublicRoute = publicRoutes.includes(pathname)
  if (isPublicRoute && userId) {
    return NextResponse.redirect(new URL('/settings', request.nextUrl))
  }

  // Redirect if there is no locale
  // request.nextUrl.pathname = `/${i18n.defaultLocale}${pathname}`
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  // return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
}
