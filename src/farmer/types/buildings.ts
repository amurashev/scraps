type Building = {
  id: string
  name: string
  position: number[]
}

export type SimpleBuilding = Building & {
  type: 'hall' | 'house' | 'shop'
  subType?: number
}

export type Warehouse = Building & {
  capacity: number
  products: Record<string, number>
}

export type FarmProducing = {
  productId: string
  startDay: number
  endDay: number
  power: number
  cycles: number | undefined
  status: 'active' | 'noWarehouse' | 'warehouseIsFull'
}

export type Farm = Building & {
  producing?: FarmProducing
  warehouseId?: Warehouse['id']
}
