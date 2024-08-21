export const postOrder = async (data: {
  type: string
  items: { id: string; count: number }[]
  price: number
}): Promise<{ id: string }> => {
  const response = await fetch('/api/orders', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/vnd.api+json',
      Authorization: `TOKEN`,
      Accept: 'application/vnd.api+json',
    },
  }).then((res) => res.json())

  return response
}
