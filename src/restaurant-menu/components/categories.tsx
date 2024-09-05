/* eslint-disable camelcase, no-underscore-dangle */

import { RESTAURANT_CATEGORIES_QUERYResult } from '../../../sanity.types'

import { Category } from './category'

export function Categories({
  categories,
  selectedCategoryId,
  onClick,
}: {
  categories: RESTAURANT_CATEGORIES_QUERYResult
  selectedCategoryId: string
  onClick: (id: string) => void
}) {
  return (
    <div className="w-full">
      <ul className="flex gap-4">
        {categories.map((item) => (
          <Category
            key={item._id}
            item={item}
            isSelected={selectedCategoryId === item._id}
            onClick={() => onClick(item._id)}
          />
        ))}
      </ul>
    </div>
  )
}
