import { route } from '@/lib/routing'

type BaseRoute<Params = {}> = {
  params: Params
} // TODO: Improve

type BlogPostRoute = {
  params: {
    slug: string
  }
}
type ComponentPageRoute = {
  params: {
    slug: string
  }
}
type L18nPostRoute = {
  params: {
    locale: string
  }
}

export const cvRoute = route('/apps/cv')
export const blogRoute = route('/apps/blog')
export const blogPostRoute = route<BlogPostRoute>('/apps/blog/post/[slug]')
export const jobsRoute = route('/apps/jobs')
export const messengerRoute = route('/apps/messenger')
export const lifeRoute = route('/apps/life')
export const l18nRoute = route<L18nPostRoute>('/apps/l18n/[locale]')
export const questionnaireRoute = route('/apps/questionnaire')

export const restaurantRoute = route('/apps/restaurant')
export const restaurantMenuRoute = route('/apps/restaurant/menu')
export const restaurantOrdersRoute = route('/apps/restaurant/orders')
export const restaurantDashboardRoute = route('/apps/restaurant/dashboard')


export const componentPageRoute =
  route<ComponentPageRoute>('/components/[slug]')
