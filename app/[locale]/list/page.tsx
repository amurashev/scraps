import Image from 'next/image'
import { Movie } from './types'

const fetchData = async () => {
  const data = await fetch(
    'https://www.omdbapi.com/?i=tt3896198&apikey=9172f4c7'
  ).then((res) => res.json())

  return data
}

export default async function ListPage() {
  const result = await fetchData()
  const list = [result] as Movie[]
  console.warn('ListPage', result)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-6 py-6 md:px-12 md:py-12">
      <div className="space-y-6 max-w-[960px]">
        <ul>
          {list.map((item) => {
            return (
              <li key={item.imdbID}>
                {item.Title}
                <Image
                  src={item.Poster}
                  alt={item.Title}
                  width={180}
                  height={236}
                />
              </li>
            )
          })}
        </ul>
      </div>
    </main>
  )
}
