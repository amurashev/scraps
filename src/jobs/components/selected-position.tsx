'use client'

import { Card } from '@/components/ui/card'

import JobView from './job-view'

import { JobsPosition } from '../types'

export default function SelectedPosition({
  isLiked,
  selectedPosition,
  onLikeClick,
  onApplyClick,
  onIgnoreClick,
}: {
  isLiked: boolean
  selectedPosition: JobsPosition
  onLikeClick: () => void
  onApplyClick: () => void
  onIgnoreClick: () => void
}) {
  return (
    <Card className="md:overflow-hidden md:h-full">
      <JobView
        {...selectedPosition}
        title={selectedPosition.title}
        companyName={selectedPosition.company.name}
        companyAvatarUrl={selectedPosition.company.logo}
        positionTerm={selectedPosition.type}
        positionLevel={selectedPosition.level}
        locationType={selectedPosition.locationType}
        date="2024-08-12T16:15:53+02:00"
        onApplyClick={onApplyClick}
        onIgnoreClick={onIgnoreClick}
        isLiked={isLiked}
        onLikeClick={onLikeClick}
      />
    </Card>
  )
}
