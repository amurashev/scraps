import { apiRequest } from '../request'

type Session = {
  id: string
}

type User = {
  id: string
  email: string
  firstName: string
  lastName: string
}

export const getUser = async (data: { id: string }) => {
  const response = await apiRequest<User>(`/api/auth/${data.id}`, {
    method: 'GET',
  })

  return response
}

export const createSession = async (data: {
  email: string
  password: string
}) => {
  const response = await apiRequest<Session>('/api/auth', {
    method: 'POST',
    data,
  })

  return response
}
