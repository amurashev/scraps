const apiHost = process.env.NEXT_PUBLIC_API_HOST

export type Response<T> = {
  data?: T
  error?: { message: string; field: string; code: string }
  status: number
}

export const apiRequest = async <T>(
  url: string,
  props: {
    data?: Record<string, any>
    method?: 'GET' | 'POST' | 'PUT'
    cache?: 'force-cache'
  }
): Promise<Response<T>> => {
  const { data, method = 'GET', cache } = props || {}

  const getParams =
    method === 'GET' && data ? new URLSearchParams(data).toString() : ''

  return fetch(`${apiHost}${url}?${getParams}`, {
    method,
    body: method !== 'GET' && data ? JSON.stringify(data) : undefined,
    headers: {
      'Content-Type': 'application/vnd.api+json',
      Authorization: `TOKEN`,
      Accept: 'application/vnd.api+json',
    },
    cache,
  }).then((res) => res.json())
}
