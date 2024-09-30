import { Farm, SimpleBuilding, Warehouse } from './buildings'
import { Shipment, Transport } from './transport'

export type GridPoint = string

export type CellState = {
  itemId: string
  startGrowthTime: number
  endGrowthTime: number
}
export type GridState = Record<GridPoint, CellState | null>

export type State = {
  time: {
    value: number
    isPaused: boolean
  }
  money: number
  seeds: Record<string, number>
  grid: {
    pointOfView: number[]
    cellSize: number
  }
  ui: {
    farmDetailsId?: string
    warehouseDetailsId?: string
    shopDetailsId?: string
    isTransportModal: boolean
    isShipmentModal: boolean
    hasPaths: boolean
  }
  editMode: {
    createItem: 'road' | 'farm' | 'warehouse' | null
  }
  roads: number[][]
  farms: Farm[]
  warehouses: Warehouse[]
  transports: Pick<Transport, 'id' | 'type'>[]
  shipments: Shipment[]
  simpleBuildings: SimpleBuilding[]
}
