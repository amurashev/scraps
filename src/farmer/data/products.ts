import { Product } from '../types/products'

const products: Record<string, Product> = {
  '1': {
    id: '1',
    name: 'Carrot',
    growthTime: [100, 150],
    price: 10,
    produceCost: 100,
  },
  '2': {
    id: '2',
    name: 'Cabbage',
    growthTime: [120, 200],
    price: 40,
    produceCost: 100,
  },
  '3': {
    id: '3',
    name: 'Corn',
    growthTime: [120, 200],
    price: 100,
    produceCost: 100,
  },
  '4': {
    id: '4',
    name: 'Pumpkin',
    growthTime: [120, 200],
    price: 1000,
    produceCost: 100,
  },
}

export const allProductsId = Object.keys(products).map((id) => id)

export default products
