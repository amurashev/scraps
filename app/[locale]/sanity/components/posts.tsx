/* eslint-disable camelcase, no-underscore-dangle */

import { POSTS_QUERYResult } from '../../../../sanity.types'

export function Posts({ posts }: { posts: POSTS_QUERYResult }) {
  return (
    <ul className="grid grid-cols-1 divide-y divide-blue-100">
      {posts.map((post) => (
        <li key={post._id}>
          <a
            className="block py-3 hover:underline"
            href={`/sanity/post/${post?.slug?.current}`}
          >
            {post?.title}
          </a>
        </li>
      ))}
    </ul>
  )
}
