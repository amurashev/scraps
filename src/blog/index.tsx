/* eslint-disable camelcase, no-underscore-dangle */

import { sanityFetch } from '@/sanity/lib/client'
import { POSTS_QUERY } from '@/sanity/lib/queries'
import { POSTS_QUERYResult } from '../../sanity.types'

import { Posts } from './components/posts'

export default async function BlogPage() {
  const posts = await sanityFetch<POSTS_QUERYResult>({
    query: POSTS_QUERY,
  })

  return (
    <main>
      <div className="container max-w-4xl py-6 space-y-4">
        <h1 className="text-2xl font-bold">Posts</h1>
        <Posts posts={posts} />
      </div>
    </main>
  )
}
