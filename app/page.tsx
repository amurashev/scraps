import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
} from '@/components/ui/card'
import Link from 'next/link'

const pages = [
  {
    title: 'CV',
    description: "Minimalist page that shows CV of it's developer",
    href: '/cv',
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
]

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="grid md:grid-cols-3 gap-4">
          {pages.map((item) => (
            <Link key={item.href} href={item.href} className="h-full block md:flex">
              <Card>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
