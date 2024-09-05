/* eslint-disable camelcase, no-underscore-dangle */

import { QueryParams } from 'next-sanity'
import { notFound } from 'next/navigation'

import { POST_QUERY } from '@/sanity/lib/queries'

import { sanityFetch } from '@/sanity/lib/client'
import { POST_QUERYResult } from '../../../sanity.types'

import { Post } from './components/post'

export default async function BlogPostPage({
  params,
}: {
  params: QueryParams
}) {
  const post = await sanityFetch<POST_QUERYResult>({
    query: POST_QUERY,
    params,
  })

  if (!post) {
    return notFound()
  }

  return (
    <div className="container max-w-2xl py-6">
      <Post post={post} />
    </div>
  )
}
