type Building = {
  id: string
  name: string
  position: [number, number]
}

export type Warehouse = Building & {
  capacity: number
  products: Record<string, number>
}

export type FarmProducing = {
  productId: string
  startTime: number
  endTime: number
  power: number
  cycles: number | undefined
}

export type Farm = Building & {
  producing?: FarmProducing
  warehouseId?: Warehouse['id']
}
