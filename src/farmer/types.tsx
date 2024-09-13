export type GridPoint = string

export type CellState = {
  itemId: string
}
export type GridState = Record<GridPoint, CellState>

export type State = {
  grid: GridState
  money: number
  seeds: Record<string, number>
}

export type Entity = {
  id: string
  name: string
}

export type Action = { type: 'plantSeed'; id: string; point: GridPoint }
