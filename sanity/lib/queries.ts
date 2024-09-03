import { groq } from 'next-sanity'

export const POSTS_QUERY = groq`*[_type == "post" && defined(slug.current)][0...12]{
  _id, title, slug, body, mainImage, publishedAt
}`

export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]{
  title, body, mainImage, publishedAt
}`

export const RESTAURANT_CATEGORIES_QUERY = groq`*[_type == "restaurantCategory" && defined(slug.current)][0...12]{
  _id, title, slug, image
}`

export const RESTAURANT_PRODUCTS_SHOTS_QUERY = groq`
*[
  _type == "restaurantProduct" && defined(slug.current)
][0...12]{
  _id, 
  title,
  slug,
  image,
  description,
  price,
  category->{
    _id, 
    slug,
    title
  }, 
}
`
