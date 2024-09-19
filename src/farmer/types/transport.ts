export type Transport = {
  id: string
  type: number
  category: 'truck'
  capacity: number
  maintenancePrice: number
}

export type Cargo = {
  itemId: string
  count: number
}

export type Shipment = {
  id: string
  from: string
  to: string
  transportId: string
  shouldWait: boolean
  status: 'new' | 'goToP1' | 'collectCargo' | 'goToP2' | 'deliverCargo'
  statusDuration: number
  statusStartDay: number
  cargoPlan: Cargo[]
  cargoShipment: Cargo[]
}
