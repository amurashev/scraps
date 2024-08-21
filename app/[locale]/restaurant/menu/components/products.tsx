/* eslint-disable camelcase, no-underscore-dangle */

import { RESTAURANT_PRODUCTS_SHOTS_QUERYResult } from '../../../../../sanity.types'

import { Product } from './product'

export function Products({
  categoryProducts,
  onProductClick,
}: {
  categoryProducts: RESTAURANT_PRODUCTS_SHOTS_QUERYResult
  onProductClick: (id: string) => void
}) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-2xl font-bold">Products</h2>
      {categoryProducts.length > 0 ? (
        <ul className="grid grid-cols-3 gap-4">
          {categoryProducts.map((item) => (
            <Product
              key={item._id}
              item={item}
              onClick={() => onProductClick(item._id)}
            />
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground">
          There are no products for this category yet
        </p>
      )}
    </div>
  )
}
