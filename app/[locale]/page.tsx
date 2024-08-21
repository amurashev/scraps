import Link from 'next/link'

import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { blogRoute, restaurantRoute } from '@/constants/routes'

const apps = [
  {
    title: 'CV',
    description: "Minimalist page that shows CV of it's developer",
    href: '/cv',
  },
  {
    title: 'Messenger',
    description:
      'Example of simple messenger. Just layout with some basic actions (w/o data saving/fetching)',
    href: '/messenger',
  },
  {
    title: 'Settings',
    description: 'Several forms with validation',
    href: '/settings/profile',
    subPages: ['/settings/profile', '/settings/notifications'],
    tags: ['react-hook-form'],
  },
  {
    title: 'l18n',
    description: 'Example of using Internationalization for content',
    href: '/l18n',
    tags: ['react-intl'],
  },
  {
    title: 'Blog',
    description: 'Based on Sanity.io CMS',
    tags: ['Sanity.io'],
    href: blogRoute.getUrl(),
  },
  {
    title: 'Restaurant',
    description: 'Example of simple app to use in the restaurant industry',
    tags: ['Sanity.io'],
    href: restaurantRoute.getUrl(),
  },
  {
    title: 'Questionnaire',
    description:
      'An example of page with questionnaire. Myers-Briggs Type Indicator is used as example',
    href: '/questionnaire',
  },
  {
    title: 'Life bars',
    description: 'Simple page to present the life cycle as a graph.',
    href: '/life',
  },
  {
    title: 'Login page',
    description: 'Example of minimalistic login page',
    href: '/login',
  },
  // {
  //   title: 'AI',
  //   description: '',
  //   href: '/ai',
  // },
]

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      <div className="z-10 w-full max-w-4xl items-center justify-between font-mono text-sm lg:flex">
        <div className="grid md:grid-cols-3 gap-4">
          {apps.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="h-full block md:grid"
            >
              <Card>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>

                  {item.tags && (
                    <ul>
                      {item.tags.map((tag) => (
                        <Badge>{tag}</Badge>
                      ))}
                    </ul>
                  )}
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
