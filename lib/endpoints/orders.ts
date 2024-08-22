import { apiRequest } from '../request'

type Order = {
  id: string
  type: string
  items: string
  created_at: string
  status: 'new' | 'done'
}

export const getOrders = async () => {
  const response = await apiRequest<Order[]>('/api/orders', {
    method: 'GET',
  })

  return response
}

export const postOrder = async (data: {
  type: string
  items: { id: string; count: number }[]
  price: number
}) => {
  const response = await apiRequest<{ id: string }>('/api/orders', {
    method: 'POST',
    data,
  })

  return response
}

export const putOrder = async (data: { id: string; status: 'done' }) => {
  const response = await apiRequest<Order>('/api/orders', {
    method: 'PUT',
    data,
  })

  return response
}
