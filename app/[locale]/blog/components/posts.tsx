/* eslint-disable camelcase, no-underscore-dangle */

import { blogPostRoute } from '@/constants/routes'
import { POSTS_QUERYResult } from '../../../../sanity.types'

export function Posts({ posts }: { posts: POSTS_QUERYResult }) {
  return (
    <ul className="grid grid-cols-1 divide-y divide-blue-100">
      {posts.map((post) => {
        const blogPostUrl = blogPostRoute.getUrl({
          params: {
            slug: post?.slug?.current as string,
          },
        })

        return (
          <li key={post._id}>
            <a className="block py-3 hover:underline" href={blogPostUrl}>
              {post?.title}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
