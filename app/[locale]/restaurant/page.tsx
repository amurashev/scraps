import Link from 'next/link'

import { Card } from '@/components/ui/card'
import { restaurantMenuRoute, restaurantOrdersRoute } from '@/constants/routes'

export default async function Page() {
  return (
    <div className="min-h-screen">
      <div className="container max-w-2xl py-6 flex flex-col gap-4">
        <Card>
          <Link
            className="p-6 w-full block"
            href={restaurantMenuRoute.getUrl()}
          >
            Menu
          </Link>
        </Card>
        <Card>
          <Link
            className="p-6 w-full block"
            href={restaurantOrdersRoute.getUrl()}
          >
            Orders
          </Link>
        </Card>
      </div>
    </div>
  )
}
