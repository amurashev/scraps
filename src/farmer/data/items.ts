import { Entity } from '../types'

const entities: Record<string, Entity> = {
  '1': {
    id: '1',
    name: 'Carrot',
    growthTime: [100, 150],
  },
  '2': {
    id: '2',
    name: 'Cabbage',
    growthTime: [120, 200],
  },
  '3': {
    id: '3',
    name: 'Corn',
    growthTime: [10, 15],
  },
  '4': {
    id: '4',
    name: 'Pumpkin',
    growthTime: [10, 15],
  },
}

export default entities
