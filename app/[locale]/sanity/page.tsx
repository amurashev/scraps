/* eslint-disable camelcase, no-underscore-dangle */

import { sanityFetch } from '@/sanity/lib/client'
import { POSTS_QUERY } from '@/sanity/lib/queries'
import { POSTS_QUERYResult } from '../../../sanity.types'

import { Posts } from './components/posts'

export default async function Page() {
  const posts = await sanityFetch<POSTS_QUERYResult>({
    query: POSTS_QUERY,
  })

  return (
    <div className="min-h-screen">
      <div className="container max-w-2xl py-6">
        <h1 className="text-2xl font-bold">Posts</h1>
        <Posts posts={posts} />
      </div>
    </div>
  )
}
