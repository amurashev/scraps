import { sql } from '@vercel/postgres'
import { NextResponse, NextRequest } from 'next/server'
import { headers } from 'next/headers'

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

  return NextResponse.json({ rows })
}

type Data = {
  type: string
  items: { id: string; count: number }[]
  price: number
}

export async function POST(request: NextRequest) {
  const data: Data = await request.json()
  const headersList = headers()

  const authorization = headersList.get('authorization')

  if (authorization !== 'TOKEN') {
    return NextResponse.json({ error: 'Token is wrong' }, { status: 401 })
  }

  if (data.items && data.price) {
    const itemsString = JSON.stringify(data.items)

    try {
      const client = await sql.connect()

      await client.sql`INSERT INTO orders (type, price, items, status) VALUES (${data.type}, ${data.price}, ${itemsString}, 'new');`
      const { rows } = await client.sql`SELECT currval('orders_id_seq');`
      client.release()

      const id = rows.length ? rows[0].currval : null

      return NextResponse.json({ id })
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 })
    }
  }
}
