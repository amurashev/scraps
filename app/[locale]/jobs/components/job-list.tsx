'use client'

import { Position, Company } from '@/lib/fake-data'
import JobCard from '@/components/jobs/job-card'
import { Card } from '@/components/ui/card'

export default function JobList({
  positions,
}: {
  positions: (Position & {
    company: Company
  })[]
}) {
  console.warn('positions', positions)

  return (
    <ul className="space-y-3 overflow-y-auto h-full px-3 py-5">
      {positions.map((item) => {
        return (
          <Card key={item.id}>
            <JobCard
              {...item}
              position={item.title}
              companyName={item.company.name}
              companyAvatarUrl={item.company.logo}
              location={item.location}
              positionTerm="full"
              positionLevel="entry"
              locationType="remote"
              date="2024-08-12T16:15:53+02:00"
              description=""
              // skills={[]}
            />
          </Card>
        )
      })}
    </ul>
  )
}
