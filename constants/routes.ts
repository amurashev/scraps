import { route } from '@/lib/routing'

export const blogRoute = route('/blog')

type BlogPostRoute = {
  params: {
    slug: string
  }
}
export const blogPostRoute = route<BlogPostRoute>('/blog/post/[slug]')


