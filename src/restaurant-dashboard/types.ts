export type Order = {
  id: string
  type: string
  items: string
  created_at: string
  status: 'new' | 'done'
}
