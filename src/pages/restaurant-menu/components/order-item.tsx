/* eslint-disable camelcase, no-underscore-dangle */

import Image from 'next/image'

import { urlFor } from '@/sanity/lib/image'

import { RESTAURANT_PRODUCTS_SHOTS_QUERYResult } from '../../../../sanity.types'

export function OrderItem({
  item,
  count,
  onItemAdd,
  onItemDelete,
}: {
  item: RESTAURANT_PRODUCTS_SHOTS_QUERYResult[0]
  count: number
  onItemAdd: () => void
  onItemDelete: () => void
}) {
  const { title, image, price } = item || {}
  const imageSize = 52

  return (
    <div className="flex flex-row overflow-hidden py-3">
      {image?.asset?._ref ? (
        <Image
          className="m-0 flex-shrink-0 rounded-sm"
          src={urlFor(image?.asset?._ref)
            .width(imageSize)
            .height(imageSize)
            .url()}
          width={imageSize}
          height={imageSize}
          alt={title || ''}
        />
      ) : null}
      <div className="px-3 flex flex-col gap-0 w-full pr-3 min-w-[1px]">
        {title ? (
          <div className="font-bold flex-1 truncate">{title}</div>
        ) : null}
        <div className="flex items-center w-full">
          <div className="flex-grow font-bold text-blue-500">{price} $</div>
          <div className="flex items-center gap-3">
            <button
              className="w-6 h-6 rounded-sm bg-foreground text-background flex items-center justify-center border border-border border-1"
              onClick={onItemDelete}
              type="button"
            >
              -
            </button>
            <div className="font-bold">{count}</div>
            <button
              className="w-6 h-6 rounded-sm bg-foreground text-background flex items-center justify-center border border-border border-1"
              onClick={onItemAdd}
              type="button"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
