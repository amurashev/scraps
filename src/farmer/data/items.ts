import { Product } from '../types'

const entities: Record<string, Product> = {
  '1': {
    id: '1',
    name: 'Carrot',
    growthTime: [100, 150],
    price: 10,
  },
  '2': {
    id: '2',
    name: 'Cabbage',
    growthTime: [120, 200],
    price: 40,
  },
  '3': {
    id: '3',
    name: 'Corn',
    growthTime: [120, 200],
    price: 100,
  },
  '4': {
    id: '4',
    name: 'Pumpkin',
    growthTime: [120, 200],
    price: 1000,
  },
}

export default entities
