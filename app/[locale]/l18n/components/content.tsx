'use client'

import { useIntl } from 'react-intl'
import Link from 'next/link'
import { format } from 'date-fns'
import { es, enGB, ar } from 'date-fns/locale'

import { Card, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Price from '@/components/price'

import messages from './messages'

const locales = [
  {
    locale: 'en',
    label: '🇬🇧',
    dateLocale: enGB,
    currency: 'GBP',
  },
  {
    locale: 'es',
    label: '🇪🇸',
    dateLocale: es,
    currency: 'EUR',
  },
  {
    locale: 'ar',
    label: '🇸🇦',
    dateLocale: ar,
    currency: 'SAR',
  },
]

export default function Content() {
  const { formatMessage, locale } = useIntl()

  const localeData =
    locales.find((item) => item.locale === locale) || locales[0]

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
            <div className="space-y-2">
              <div className="space-y-1">
                <h2 className="font-bold text-xl">
                  {formatMessage(messages.title)}
                </h2>
                <p>{formatMessage(messages.text)}</p>
              </div>
              <ul>
                <li className="font-bold">
                  {format(new Date(), 'PPPP', {
                    locale: localeData.dateLocale,
                  })}
                </li>
                <li className="font-bold">
                  <Price value={500} currency={localeData.currency} />
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </main>
  )
}
