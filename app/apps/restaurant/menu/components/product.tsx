/* eslint-disable camelcase, no-underscore-dangle */

import Image from 'next/image'

import { urlFor } from '@/sanity/lib/image'
import { RESTAURANT_PRODUCTS_SHOTS_QUERYResult } from '../../../../../sanity.types'
import { Card } from '@/components/ui/card'

export function Product({
  item,
  onClick,
}: {
  item: RESTAURANT_PRODUCTS_SHOTS_QUERYResult[0]
  onClick: () => void
}) {
  const { title, image, price } = item || {}

  return (
    <Card
      className="flex flex-col overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      {image?.asset?._ref ? (
        <Image
          className="m-0 flex-shrink-0"
          src={urlFor(image?.asset?._ref).width(300).height(220).url()}
          width={300}
          height={220}
          alt={title || ''}
        />
      ) : null}
      <div className="px-3 py-2 flex gap-2">
        {title ? <div className="font-bold flex-1">{title}</div> : null}
        {price && <div className="font-bold text-blue-500">{price} $</div>}
      </div>
    </Card>
  )
}
