import { route } from '@/lib/routing'

export const blogRoute = route('/blog')

type BlogPostRoute = {
  params: {
    slug: string
  }
}
export const blogPostRoute = route<BlogPostRoute>('/blog/post/[slug]')

export const restaurantRoute = route('/restaurant')
export const restaurantMenuRoute = route('/restaurant/menu')
export const restaurantOrdersRoute = route('/restaurant/orders')
export const restaurantDashboardRoute = route('/restaurant/dashboard')


type ComponentPageRoute = {
  params: {
    slug: string
  }
}
export const componentPageRoute = route<ComponentPageRoute>('/components/[slug]')
