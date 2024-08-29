import { NextResponse } from 'next/server'

import { i18n } from './i18n-config'

const l18nExceptions = ['/studio', '/api', '/components']

export function middleware(request) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  const noNeedTol18n = l18nExceptions.some(
    (path) => pathname.startsWith(path) || pathname === path
  )

  if (pathnameHasLocale || noNeedTol18n) return
  return

  // Redirect if there is no locale
  request.nextUrl.pathname = `/${i18n.defaultLocale}${pathname}`
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
}
