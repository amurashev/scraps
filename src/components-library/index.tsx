import Link from 'next/link'

import { componentPageRoute } from '@/constants/routes'

import { components } from './data'

export default function ComponentsLibraryPage() {
  return (
    <div className="w-full h-full space-y-4">
      <h1 className="font-bold text-xl">Select component</h1>
      <ul className="list-disc pl-5">
        {Object.keys(components)
          .filter((index) => !components[index].isHidden)
          .map((index) => {
            const url = componentPageRoute.getUrl({
              params: {
                slug: index,
              },
            })
            return (
              <li className="">
                <Link className="h-full w-full block text-link" href={url}>
                  {components[index as keyof typeof components].name}
                </Link>
              </li>
            )
          })}
      </ul>
    </div>
  )
}
