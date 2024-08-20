/* eslint-disable camelcase, no-underscore-dangle */

import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'

import { urlFor } from '@/sanity/lib/image'
import { POST_QUERYResult } from '../../../../../../sanity.types'

export function Post({ post }: { post: POST_QUERYResult }) {
  const { title, mainImage, body, publishedAt } = post || {}

  return (
    <article className="flex flex-col space-y-4">
      {title ? <h1 className="text-2xl font-bold">{title}</h1> : null}
      <div className="flex space-x-4">
        {mainImage?.asset?._ref ? (
          <Image
            className="m-0 w-1/3 rounded-lg flex-shrink-0"
            src={urlFor(mainImage?.asset?._ref).width(300).height(300).url()}
            width={300}
            height={300}
            alt={title || ''}
          />
        ) : null}
        {body ? <PortableText value={body} /> : null}
      </div>
      <div>{publishedAt}</div>
      <Link href="/blog" className="text-blue-600">
        Back to articles
      </Link>
    </article>
  )
}
