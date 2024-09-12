export type GridItem = {
  itemId: string
}
export type GridState = Record<string, GridItem>

export type State = {
  grid: GridState
  money: number
}

export type Entity = {
  id: string
  name: string
}

export type Action = { type: 'setSelectedJob'; id: string | null }
