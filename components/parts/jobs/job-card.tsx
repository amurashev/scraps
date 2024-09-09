'use client'

import classNames from 'classnames'
import { forwardRef } from 'react'
import { formatDistance } from 'date-fns'
import {
  IoLocationOutline,
  IoBookmark,
  IoBookmarkOutline,
} from 'react-icons/io5'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { IconButton } from '@/components/ui/icon-button'
import { Separator } from '@/components/ui/separator'

export const JobCardSkeleton = forwardRef<
  HTMLDivElement,
  { hasSkills?: boolean; hasDescription?: boolean }
>(function JobCardSkeletonSkeleton({ hasDescription, hasSkills }, ref) {
  return (
    <div ref={ref} className={classNames('w-full px-4 py-4')}>
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          <Skeleton className="h-10 w-10 rounded-sm" />
        </div>
        <div className="flex-grow space-y-2">
          <Skeleton className="h-4 w-[60%]" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
      <Separator className="mt-2" />

      <div className="flex gap-4 mt-3">
        <Skeleton className="h-4 w-[75px]" />
        <Skeleton className="h-4 w-[75px]" />
        <Skeleton className="h-4 w-[75px]" />
      </div>

      {hasDescription && (
        <div className="mt-3">
          <Skeleton className="h-11 w-full" />
        </div>
      )}

      <div className="flex gap-4 mt-3">
        <Skeleton className="h-4 w-[100px]" />
      </div>

      {hasSkills && (
        <>
          <Separator className="mt-2" />

          <div className="flex gap-4 mt-3">
            <Skeleton className="h-5 rounded-full w-[20%]" />
            <Skeleton className="h-5 rounded-full w-[20%]" />
            <Skeleton className="h-5 rounded-full w-[20%]" />
          </div>
        </>
      )}
    </div>
  )
})

export interface JobCardProps {
  /**
   * Job position name
   */
  position: string
  /**
   * Company name
   */
  companyName: string
  /**
   * Scr of Company logo.
   */
  companyAvatarUrl?: string
  /**
   * Position location
   */
  location: string
  /**
   * Posting date of position.
   */
  date: string | Date
  /**
   * Position description.
   */
  description?: string
  /**
   * Array of position skills
   */
  skills: string[]
  locationType: 'remote' | 'on-site' | 'hybrid'
  positionTerm: 'full' | 'part' | 'contract'
  positionLevel: 'entry' | 'middle' | 'senior'
  /**
   * Salary number
   */
  salary?: number
  /**
   * Salary type
   */
  salaryType?: 'yearly' | 'monthly' | 'hourly'
  /**
   * Mark card as liked.
   */
  isLiked?: boolean
  /**
   * Handle like button click
   */
  onLikeClick?: () => void
}

const getDateLabel = (date: string | Date) =>
  formatDistance(date, new Date(), { addSuffix: true })

const locationTypeLabel: Record<JobCardProps['locationType'], string> = {
  remote: 'Remote',
  hybrid: 'Hybrid',
  'on-site': 'On Site',
}

const positionTermLabel: Record<JobCardProps['positionTerm'], string> = {
  full: 'Full-time',
  part: 'Part-time',
  contract: 'contract',
}

const salaryTypeLabel: Record<'yearly' | 'monthly' | 'hourly', string> = {
  yearly: 'yr',
  monthly: 'm',
  hourly: 'hr',
}

const positionLevelLabel: Record<JobCardProps['positionLevel'], string> = {
  entry: 'Entry level',
  middle: 'Middle level',
  senior: 'Senior level',
}

function Salary({
  salary,
  salaryType = 'monthly',
}: {
  salary: number
  salaryType: JobCardProps['salaryType']
}) {
  const fixedSalary = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(salary)
  return (
    <div>
      <span>{fixedSalary}</span>
      <span>/{salaryTypeLabel[salaryType]}</span>
    </div>
  )
}

const JobCard = forwardRef<HTMLDivElement, JobCardProps>(function JobCard(
  {
    position = '',
    companyName = '',
    location,
    locationType = 'on-site',
    salary,
    salaryType = 'monthly',
    positionLevel = 'entry',
    positionTerm = 'full',
    description = '',
    companyAvatarUrl,
    skills = [],
    date,
    isLiked = false,
    onLikeClick,
  },
  ref
) {
  const formattedDate = getDateLabel(date)

  const params: (string | React.ReactElement)[] = [
    locationTypeLabel[locationType],
    positionTermLabel[positionTerm],
    positionLevelLabel[positionLevel],
  ]

  if (salary) {
    params.push(<Salary salary={salary} salaryType={salaryType} />)
  }

  const clearedDescription = description.replace(/<[^>]*>?/gm, '')

  return (
    <div
      ref={ref}
      className={classNames('relative w-full px-4 py-4 cursor-pointer', {})}
    >
      <div>
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <Avatar type="square" size={10}>
              <AvatarImage src={companyAvatarUrl} />
              <AvatarFallback>{companyName}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col space-y-0 min-w-[1px]">
            <div className="font-bold text-base flex-grow truncate-2 min-w-[1px] pr-8 leading-5 truncate">
              {position}
            </div>

            <div className="text-sm text-muted-foreground flex gap-2">
              <div className="truncate">{companyName}</div>
              <div className="flex items-center flex-shrink-0">
                <IoLocationOutline size={14} />
                &nbsp;
                <div>{location}</div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="mt-2" />

        <div>
          {params.length && (
            <div className="flex flex-wrap gap-1 font-bold text-sm mt-2">
              {params.map((item, key) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={key}>
                  {item}
                  {key !== params.length - 1 && <>&nbsp;&bull;</>}
                </div>
              ))}
            </div>
          )}

          {clearedDescription.length > 0 && (
            <p className="line-clamp-2 mt-2">{clearedDescription}</p>
          )}

          <div className="text-sm text-muted-foreground mt-2">
            {formattedDate}
          </div>
        </div>

        {skills.length > 0 && (
          <>
            <Separator className="mt-2" />

            <div className="flex gap-1 flex-wrap mt-3">
              {skills.map((item) => (
                <Badge key={item} variant="secondary">
                  {item}
                </Badge>
              ))}
              {/* {skills.length > 3 && (
                  <Badge variant="secondary">+{skills.length - 3}</Badge>
                )} */}
            </div>
          </>
        )}
      </div>

      <div className="text-gray-600 absolute top-1 right-1">
        {onLikeClick ? (
          <IconButton
            onClick={(e) => {
              e.stopPropagation()
              onLikeClick()
            }}
            className="p-2"
          >
            {isLiked ? (
              <IoBookmark size={16} />
            ) : (
              <IoBookmarkOutline size={16} />
            )}
          </IconButton>
        ) : (
          <div className="p-2">
            {isLiked ? (
              <IoBookmark size={16} />
            ) : (
              <IoBookmarkOutline size={16} />
            )}
          </div>
        )}
      </div>
    </div>
  )
})
JobCard.displayName = 'JobCard'

export default JobCard
