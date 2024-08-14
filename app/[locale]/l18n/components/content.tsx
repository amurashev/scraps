'use client'

import { useIntl } from 'react-intl'
import Link from 'next/link'
import { Card, CardTitle } from '@/components/ui/card'

import messages from './messages'
import { Separator } from '@/components/ui/separator'

const locales = [
  {
    locale: 'en',
    label: '🇬🇧',
  },
  {
    locale: 'es',
    label: '🇪🇸',
  },
  {
    locale: 'ar',
    label: '🇸🇦',
  },
]

export default function Content() {
  const { formatMessage } = useIntl()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-6 px-3 md:p-12 container">
      <div className="z-10 w-full max-w-2xl items-center justify-between font-mono text-sm">
        <Card>
          <div className="px-6 py-5 space-y-3">
            <div className="flex flex-row items-center">
              <div className="flex-grow">
                <CardTitle>{formatMessage(messages.locale)}</CardTitle>
              </div>
              <div className="text-3xl flex gap-2">
                {locales.map((item) => (
                  <Link
                    key={item.locale}
                    href={`/${item.locale}/l18n`}
                    scroll={false}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <Separator />
            <div className="space-y-1">
              <h2 className="font-bold text-xl">
                {formatMessage(messages.title)}
              </h2>
              <p>{formatMessage(messages.text)}</p>
            </div>
          </div>
        </Card>
      </div>
    </main>
  )
}
