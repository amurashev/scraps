/* eslint-disable camelcase, no-underscore-dangle */

import { RESTAURANT_CATEGORIES_QUERYResult } from '../../../../../sanity.types'

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
    <div className="flex flex-col gap-3 md:items-center w-full">
      <ul className="flex md:grid gap-2">
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
