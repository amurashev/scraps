import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardHeader,
  CardFooter,
} from '@/components/ui/card'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="grid grid-cols-3 gap-4">
          {[
            {
              title: 'CV',
              description: "Minimalist page that shows CV of it's developer",
              href: '/cv',
            },
            {
              title: 'Login page',
              description: 'Example of minimalistic login page',
              href: '/login',
            },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="h-full flex">
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
