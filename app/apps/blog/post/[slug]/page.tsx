/* eslint-disable camelcase, no-underscore-dangle */

import { QueryParams } from 'next-sanity'

import { POSTS_QUERY } from '@/sanity/lib/queries'

import { client } from '@/sanity/lib/client'
import { POSTS_QUERYResult } from '../../../../../sanity.types'

import BlogPostPage from '@/src/pages/blog-post'

export async function generateStaticParams() {
  const posts = await client.fetch<POSTS_QUERYResult>(
    POSTS_QUERY,
    {},
    { perspective: 'published' }
  )

  return posts.map((post) => ({
    slug: post?.slug?.current,
  }))
}

export default async function Page({ params }: { params: QueryParams }) {
  return <BlogPostPage params={params} />
}
