/* eslint-disable camelcase, no-underscore-dangle */

import { toPlainText } from '@portabletext/react'
import Link from 'next/link'

import { Card } from '@/components/ui/card'
import ArticleCard from '@/components/parts/articles/article-card-v-1'

import { blogPostRoute } from '@/constants/routes'
import { urlFor } from '@/sanity/lib/image'
import { getRandomUser } from '@/lib/fake-data'

import { POSTS_QUERYResult } from '../../../../sanity.types'

const fakeUser = getRandomUser(0)

export function Posts({ posts }: { posts: POSTS_QUERYResult }) {
  return (
    <div className="space-y-3">
      {posts.map((post) => {
        const blogPostUrl = blogPostRoute.getUrl({
          params: {
            slug: post?.slug?.current as string,
          },
        })

        return (
          <Link href={blogPostUrl} className="block">
            <Card key={post._id}>
              <ArticleCard
                title={post?.title as string}
                date={post.publishedAt as string}
                userName={`${fakeUser.firstName} ${fakeUser.lastName}`}
                userAvatarUrl={fakeUser.avatarUrl}
                text={post.body ? toPlainText(post.body).slice(0, 255) : ''}
                pictureUrl={
                  post.mainImage
                    ? urlFor(post.mainImage?.asset?._ref as string)
                        .width(200)
                        .height(133)
                        .url()
                    : undefined
                }
              />
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
