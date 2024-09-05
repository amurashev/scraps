'use client'

import { IntlProvider } from 'react-intl'

export default function ServerIntlProvider({
  messages,
  locale,
  children,
}: {
  messages: Record<string, string>
  locale: string
  children: React.ReactNode
}) {
  return (
    <IntlProvider messages={messages} locale={locale}>
      {children}
    </IntlProvider>
  )
}
