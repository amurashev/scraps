'use client'

import { JobCardSkeleton } from '@/components/parts/jobs/job-card'
import { Card } from '@/components/ui/card'

export default function JobListSkeleton() {
  return (
    <>
      {Array.from({ length: 7 }, (_, i) => i + 1).map((_, key) => (
        // eslint-disable-next-line react/no-array-index-key
        <Card key={key} className="mt-3 first:mt-0">
          <JobCardSkeleton />
        </Card>
      ))}
    </>
  )
}
