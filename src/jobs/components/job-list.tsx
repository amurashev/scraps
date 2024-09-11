'use client'

import JobCard from '@/components/parts/jobs/job-card'
import { Card } from '@/components/ui/card'

import { cn } from '@/lib/utils'
import { Position, Company } from '@/lib/fake-data'

export default function JobList({
  positions,
  likedIds,
  selectedId,
  onItemClick,
}: {
  positions: (Position & {
    company: Company
  })[]
  likedIds: string[]
  selectedId: string | null
  onItemClick: (id: string) => void
}) {
  return (
    <>
      {positions.map((item) => {
        const isSelected = selectedId === item.id
        return (
          <Card
            key={item.id}
            onClick={() => onItemClick(item.id)}
            className={cn('mt-3 first:mt-0', {
              'ring-ring ring-2': isSelected,
            })}
            data-test="jobs_list_item"
            data-test-id={item.id}
          >
            <JobCard
              {...item}
              position={item.title}
              companyName={item.company.name}
              companyAvatarUrl={item.company.logo}
              location={item.location}
              positionTerm={item.type}
              positionLevel={item.level}
              locationType={item.locationType}
              date="2024-08-12T16:15:53+02:00"
              description=""
              isLiked={likedIds.includes(item.id)}
              skills={[]}
            />
          </Card>
        )
      })}
    </>
  )
}
