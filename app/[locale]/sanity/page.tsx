/* eslint-disable camelcase, no-underscore-dangle */

import { sanityFetch } from '@/sanity/lib/client'
import { POSTS_QUERY } from '@/sanity/lib/queries'
import { POSTS_QUERYResult } from '../../../sanity.types'

function Posts({ posts }: { posts: POSTS_QUERYResult }) {
  return (
    <ul className="container mx-auto grid grid-cols-1 divide-y divide-blue-100">
      {posts.map((post) => (
        <li key={post._id}>
          <a
            className="block p-4 hover:bg-blue-50"
            href={`/posts/${post?.slug?.current}`}
          >
            {post?.title}
          </a>
        </li>
      ))}
    </ul>
  )
}

export default async function Page() {
  const posts = await sanityFetch<POSTS_QUERYResult>({
    query: POSTS_QUERY,
  })

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Posts posts={posts} />
    </div>
  )
}
