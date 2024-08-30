import Link from 'next/link'

import { componentPageRoute } from '@/constants/routes'

import { components } from './data'

export default function Page() {
  return (
    <div className="w-full h-full px-4 py-4 space-y-4">
      <h1 className="font-bold text-lg">Select any</h1>
      <ul className="list-disc pl-4">
        {['conversation-card', 'chat-message', 'job-card'].map((index) => {
          const url = componentPageRoute.getUrl({
            params: {
              slug: index,
            },
          })
          return (
            <li className="">
              <Link className="h-full w-full block" href={url}>
                {components[index as keyof typeof components].name}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
