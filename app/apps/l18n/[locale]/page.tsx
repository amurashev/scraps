import { Locale } from '@/i18n-config'

import L18nPage from '@/src/l18n'

export default async function Page({
  params: { locale },
}: {
  params: {
    locale: Locale
  }
}) {
  return <L18nPage locale={locale} />
}
