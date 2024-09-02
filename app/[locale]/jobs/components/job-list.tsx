'use client'

import { Position, Company } from '@/lib/fake-data'
import JobCard from '@/components/jobs/job-card'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export default function JobList({
  positions,
  likedIds,
  selectedId,
  onItemClick,
  onLikeClick,
}: {
  positions: (Position & {
    company: Company
  })[]
  likedIds: string[]
  selectedId: string | null
  onItemClick: (id: string) => void
  onLikeClick: (id: string) => void
}) {
  return (
    <ul className="space-y-3 overflow-y-auto h-full px-3 py-5">
      {positions.map((item) => {
        return (
          <Card
            key={item.id}
            onClick={() => onItemClick(item.id)}
            className={cn({
              'ring ring-2 ring-ring': selectedId === item.id,
            })}
          >
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
              // isSelected={selectedId === item.id}
              isLiked={likedIds.includes(item.id)}
              onLikeClick={() => onLikeClick(item.id)}
              skills={[]}
            />
          </Card>
        )
      })}
    </ul>
  )
}
