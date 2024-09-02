import { cn } from '@/lib/utils'

import { getRandomPosition, getRandomCompany } from '@/lib/fake-data'
import JobList from './components/job-list'
import JobView from '@/components/jobs/job-view'
import { Card } from '@/components/ui/card'

export default async function Page() {
  const positions = [
    {
      ...getRandomPosition(0),
      company: getRandomCompany(0),
    },
    {
      ...getRandomPosition(1),
      company: getRandomCompany(1),
    },
    {
      ...getRandomPosition(2),
      company: getRandomCompany(2),
    },
    {
      ...getRandomPosition(3),
      company: getRandomCompany(3),
    },
    {
      ...getRandomPosition(4),
      company: getRandomCompany(4),
    },
    {
      ...getRandomPosition(5),
      company: getRandomCompany(5),
    },
  ]

  return (
    <main className="w-full h-[calc(100vh-60px)] overflow-hidden flex bg-muted relative ">
      <div
        className={cn(
          'w-[360px] flex-shrink-0 hidden md:block absolute inset-0 h-full flex-grow ',
          'lg:border-b-0 lg:border-r-[1px]'
        )}
      >
        <JobList positions={positions} />
      </div>
      <div className={cn('flex-grow min-w-1 md:pl-[360px] overflow-x-auto')}>
        <div className="px-3 py-5">
          <Card>
            <JobView
              {...positions[0]}
              position={positions[0].title}
              companyName={positions[0].company.name}
              companyAvatarUrl={positions[0].company.logo}
              date="2024-08-12T16:15:53+02:00"
              // onApplyClick={() => {}}
            />
          </Card>
        </div>
      </div>
    </main>
  )
}
