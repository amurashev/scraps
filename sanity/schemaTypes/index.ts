import { type SchemaTypeDefinition } from 'sanity'

import { blockContentType } from './blockContentType'
import { categoryType as blogCategoryType } from './categoryType'
import { postType } from './postType'
import { authorType } from './authorType'

import { categoryType as restaurantCategoryType } from './restaurant/categoryType'
import { productType } from './restaurant/product'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    blogCategoryType,
    postType,
    authorType,
    restaurantCategoryType,
    productType,
  ],
}
