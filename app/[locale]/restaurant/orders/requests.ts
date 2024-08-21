export const getOrders = async (): Promise<{ id: string }> => {
  const response = await fetch('/api/orders', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/vnd.api+json',
      Authorization: `TOKEN`,
      Accept: 'application/vnd.api+json',
    },
  }).then((res) => res.json())

  return response
}
