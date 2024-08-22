import { sql } from '@vercel/postgres'
import { NextResponse, NextRequest } from 'next/server'
import { checkAuth } from '@/lib/api'

/*
CREATE TABLE Orders (
  id serial NOT NULL,
  type varchar(10) NOT NULL,
  price int,
  items text,
  status varchar(20),
  PRIMARY KEY (id)
);
*/

export async function GET() {
  // const searchParams = request.nextUrl.searchParams
  // const query = searchParams.get('query')
  // query is "hello" for /api/search?query=hello

  const client = await sql.connect()

  const { rows } = await client.sql`SELECT * from orders;`
  client.release()

  return NextResponse.json({ data: rows })
}

type PostData = {
  type: string
  items: { id: string; count: number }[]
  price: number
}

export async function POST(request: NextRequest) {
  const authResult = checkAuth()
  if (authResult) return authResult

  const data: PostData = await request.json()

  if (!data.items) {
    return NextResponse.json({ error: 'Order is empty' }, { status: 400 })
  }

  if (!data.price) {
    return NextResponse.json({ error: 'Order price is wrong' }, { status: 400 })
  }

  const itemsString = JSON.stringify(data.items)

  try {
    const client = await sql.connect()

    await client.sql`INSERT INTO orders (type, price, items, status, created_at) VALUES (${data.type}, ${data.price}, ${itemsString}, 'new', NOW());`
    const { rows } = await client.sql`SELECT currval('orders_id_seq');`
    client.release()

    const id = rows.length ? rows[0].currval : null

    return NextResponse.json({
      data: {
        id,
      },
    })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const data: {
    id: string
    status: string
  } = await request.json()
  const authResult = checkAuth()
  if (authResult) return authResult

  if (!data.id) {
    return NextResponse.json({ error: 'Order is not found' }, { status: 400 })
  }

  if (!data.status || !['done'].includes(data.status)) {
    return NextResponse.json({ error: 'Status is incorrect' }, { status: 400 })
  }

  try {
    const client = await sql.connect()

    await client.sql`UPDATE orders SET status = ${data.status} WHERE id = ${data.id};`
    const { rows } =
      await client.sql`SELECT * from orders WHERE id = ${data.id};`
    client.release()

    const updatedItem = rows.length ? rows[0] : null

    return NextResponse.json({ data: updatedItem })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
