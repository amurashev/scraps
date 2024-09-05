import Link from 'next/link'

import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  restaurantMenuRoute,
  jobsRoute,
  cvRoute,
  messengerRoute,
  l18nRoute,
  lifeRoute,
  questionnaireRoute,
} from '@/constants/routes'
import CommonWithHeaderLayout from '@/components/layout/with-header'

const apps = [
  {
    title: 'CV',
    description: "Minimalist page that shows CV of it's developer",
    href: cvRoute.getUrl(),
  },
  {
    title: 'Messenger',
    description:
      'Example of simple messenger. Just layout with some basic actions (w/o data saving/fetching)',
    href: messengerRoute.getUrl(),
  },
  {
    title: 'l18n',
    description: 'Example of using Internationalization for content',
    href: l18nRoute.getUrl({
      params: {
        locale: 'en',
      },
    }),
    tags: ['react-intl'],
  },
  {
    title: 'Restaurant',
    description: 'Example of simple app to use in the restaurant industry',
    tags: ['Sanity.io', 'Postgres', 'Recharts'],
    href: restaurantMenuRoute.getUrl(),
  },
  {
    title: 'Jobs',
    description: 'Simple example of using some components',
    href: jobsRoute.getUrl(),
  },
  {
    title: 'Life bars',
    description: 'Simple page to present the life cycle as a graph.',
    href: lifeRoute.getUrl(),
  },
  {
    title: 'Questionnaire',
    description:
      'An example of page with questionnaire. Myers-Briggs Type Indicator is used as example',
    href: questionnaireRoute.getUrl(),
  },
  // {
  //   title: 'Blog',
  //   description: 'Based on Sanity.io CMS',
  //   tags: ['Sanity.io'],
  //   href: blogRoute.getUrl(),
  // },
  // {
  //   title: 'Login page',
  //   description: 'Example of minimalistic login page',
  //   href: '/login',
  // },
  // {
  //   title: 'Settings',
  //   description: 'Several forms with validation',
  //   href: '/settings/profile',
  //   subPages: ['/settings/profile', '/settings/notifications'],
  //   tags: ['react-hook-form'],
  // },
]

export default function Home() {
  return (
    <CommonWithHeaderLayout>
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
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <Badge key={tag}>{tag}</Badge>
                        ))}
                      </div>
                    )}
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </CommonWithHeaderLayout>
  )
}
