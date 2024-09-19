type Building = {
  id: string
  name: string
  position: [number, number] | null
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
