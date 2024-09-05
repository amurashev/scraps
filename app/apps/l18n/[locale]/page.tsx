import { Locale } from '@/i18n-config'
import Content from './components/content'

import { getDictionary } from './dictionaries'
import ServerIntlProvider from './serverIntlProvider'

export default async function l18n({
  params: { locale },
}: {
  params: {
    locale: Locale
  }
}) {
  const messages = await getDictionary(locale)

  return (
    <ServerIntlProvider locale={locale} messages={messages}>
      <Content />
    </ServerIntlProvider>
  )
}
