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
}

export type Entity = {
  id: string
  name: string
  growthTime: [number, number]
}
