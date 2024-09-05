'server-only'

import { Locale } from '@/i18n-config'

const dictionaries = {
  ar: () => import('./locales/ar.json').then((module) => module.default),
  en: () => import('./locales/en.json').then((module) => module.default),
  es: () => import('./locales/es.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale as keyof typeof dictionaries]()
