import { Inter } from 'next/font/google'

import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'

import './globals.css' // eslint-disable-line import/extensions

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = true ? 'en' : 'ar'

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body
        className={cn('bg-background font-sans antialiased', inter.className)}
      >
        {children}
        <Toaster />
      </body>
    </html>
  )
}
