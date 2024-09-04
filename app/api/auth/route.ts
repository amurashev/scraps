import bcrypt from 'bcryptjs'
import { sql } from '@vercel/postgres'
import { NextRequest } from 'next/server'

import { checkAuth, apiError, successResponse } from '@/lib/api'
import { createSession } from '@/lib/session'

/*
CREATE TABLE scraps_users (
  id serial NOT NULL,
  email varchar(90) NOT NULL,
  password varchar(60) NOT NULL,
  PRIMARY KEY (id)
);
*/

export async function POST(request: NextRequest) {
  const data: {
    email: string
    password: string
  } = await request.json()
  const authResult = checkAuth()
  if (authResult) return authResult

  const client = await sql.connect()

  const { rows } =
    await client.sql`SELECT * FROM scraps_users WHERE email = ${data.email};`
  client.release()

  const item = rows.length ? rows[0] : null

  if (!item) {
    return apiError({ message: 'User is not found' })
  }

  const checkPassword = await bcrypt.compare(data.password, item.password)

  if (!checkPassword) {
    return apiError({ message: 'Password is wrong', field: 'password' })
  }

  // Create user session
  await createSession(item.id)

  return successResponse({ id: item.id })
}

export async function PUT(request: NextRequest) {
  const data: {
    email: string
    password: string
  } = await request.json()
  const authResult = checkAuth()
  if (authResult) return authResult

  const hashedPassword = await bcrypt.hash(data.password, 10)

  const client = await sql.connect()
  await client.sql`INSERT INTO scraps_users (email, password) VALUES (${data.email}, ${hashedPassword});`
  const { rows } = await client.sql`SELECT currval('scraps_users_id_seq');`
  client.release()

  const id = rows.length ? rows[0].currval : null

  if (!id) {
    return apiError({ message: 'Something went wrong' })
  }

  // Create user session
  await createSession(id)

  return successResponse({ id })
}
