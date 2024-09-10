'use client'

import JobView from '@/components/parts/jobs/job-view'
import { Card } from '@/components/ui/card'

import { JobsPosition } from '../types'

export default function SelectedPosition({
  isLiked,
  selectedPosition,
  onLikeClick,
}: {
  isLiked: boolean
  selectedPosition: JobsPosition
  onLikeClick: () => void
}) {
  return (
    <Card className="overflow-hidden h-full">
      <JobView
        {...selectedPosition}
        position={selectedPosition.title}
        companyName={selectedPosition.company.name}
        companyAvatarUrl={selectedPosition.company.logo}
        positionTerm={selectedPosition.type}
        positionLevel={selectedPosition.level}
        locationType={selectedPosition.locationType}
        date="2024-08-12T16:15:53+02:00"
        onApplyClick={() => {}}
        isLiked={isLiked}
        onLikeClick={onLikeClick}
      />
    </Card>
  )
}
