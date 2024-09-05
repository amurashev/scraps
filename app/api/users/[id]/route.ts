import { sql } from '@vercel/postgres'
import { NextRequest } from 'next/server'
import humps from 'humps'

import { apiError, successResponse } from '@/lib/api'

export async function GET(
  _: NextRequest,
  params: {
    params: {
      id: string
    }
  }
) {
  const { id } = params.params

  if (!id) {
    return apiError({ message: 'Id is not correct' })
  }

  const client = await sql.connect()
  const { rows } =
    await client.sql`SELECT * from scraps_users WHERE id = ${id};`
  client.release()

  const item = rows.length ? rows[0] : null

  if (item) {
    delete item.password
  }

  const fixedItem = humps.camelizeKeys(item)

  return successResponse(fixedItem)
}
