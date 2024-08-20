/* eslint-disable camelcase, no-underscore-dangle */

import Image from 'next/image'
import classNames from 'classnames'

import { urlFor } from '@/sanity/lib/image'

import { Card } from '@/components/ui/card'

import { RESTAURANT_CATEGORIES_QUERYResult } from '../../../../../sanity.types'

export function Category({
  item,
  isSelected,
  onClick,
}: {
  item: RESTAURANT_CATEGORIES_QUERYResult[0]
  isSelected: boolean
  onClick: () => void
}) {
  const { title, image } = item

  return (
    <Card
      className={classNames(
        'flex flex-col gap-2 cursor-pointer relative overflow-hidden',
        {
          'ring ring-2 ring-ring': isSelected,
        }
      )}
      onClick={onClick}
    >
      {image?.asset?._ref ? (
        <Image
          className="m-0 rounded-lg flex-shrink-0"
          src={urlFor(image?.asset?._ref).width(300).height(300).url()}
          width={300}
          height={300}
          alt={title || ''}
        />
      ) : null}
      <div className="absolute top-0 left-0 right-0 bottom-0 p-4 flex items-center justify-center bg-background/60">
        <div className="font-bold text-xl">{title}</div>
      </div>
    </Card>
  )
}
