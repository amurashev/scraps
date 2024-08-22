import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

export const checkAuth = () => {
  const headersList = headers()
  const authorization = headersList.get('authorization')

  if (authorization !== 'TOKEN') {
    return NextResponse.json({ error: 'Token is wrong' }, { status: 401 })
  }

  return undefined
}
