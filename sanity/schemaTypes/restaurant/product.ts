import { LemonIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const productType = defineType({
  name: 'restaurantProduct',
  title: 'Product',
  type: 'document',
  icon: LemonIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'category',
      type: 'reference',
      to: { type: 'restaurantCategory' },
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'price',
      type: 'number',
    }),
    defineField({
      name: 'isSpicy',
      type: 'boolean',
    }),
    defineField({
      name: 'isVegetarian',
      type: 'boolean',
    }),
    defineField({
      name: 'weight',
      type: 'number',
    }),
    defineField({
      name: 'kcal',
      type: 'number',
    }),
    defineField({
      name: 'proteins',
      type: 'number',
    }),
    defineField({
      name: 'fats',
      type: 'number',
    }),
    defineField({
      name: 'carbohydrates',
      type: 'number',
    }),
    defineField({
      name: 'ingredients',
      type: 'text',
    }),
    defineField({
      name: 'description',
      type: 'text',
    }),
  ],
})
