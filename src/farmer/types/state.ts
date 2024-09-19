import { Farm, Warehouse } from './buildings'
import { Shipment, Transport } from './transport'

export type GridPoint = string

export type CellState = {
  itemId: string
  startGrowthTime: number
  endGrowthTime: number
}
export type GridState = Record<GridPoint, CellState | null>

export type State = {
  day: number
  money: number
  grid: GridState
  seeds: Record<string, number>
  barn: Record<string, number>
  ui: {
    farmDetailsId?: string
    warehouseDetailsId?: string
    isTransportModal: boolean
    isShipmentModal: boolean
  }
  farms: Farm[]
  warehouses: Warehouse[]
  transports: Pick<Transport, 'id' | 'type'>[]
  shipments: Shipment[]
}
