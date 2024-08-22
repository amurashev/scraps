const apiHost = process.env.NEXT_PUBLIC_API_HOST

export type Response<T> = {
  data?: T
  error?: string
  status: number
}

export const apiRequest = async <T>(
  url: string,
  props: { data?: Record<string, any>; method?: 'GET' | 'POST' | 'PUT' }
): Promise<Response<T>> => {
  const { data, method = 'GET' } = props || {}

  return fetch(`${apiHost}${url}`, {
    method,
    body: method !== 'GET' && data ? JSON.stringify(data) : undefined,
    headers: {
      'Content-Type': 'application/vnd.api+json',
      Authorization: `TOKEN`,
      Accept: 'application/vnd.api+json',
    },
  }).then((res) => res.json())
}
