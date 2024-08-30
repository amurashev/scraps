import classNames from 'classnames'
import { forwardRef } from 'react'
import { formatDistance } from 'date-fns'
import {
  IoLocationOutline,
  IoBookmark,
  IoBookmarkOutline,
  IoPricetagOutline,
  IoBriefcaseOutline,
  IoBusinessOutline,
  IoPersonOutline,
} from 'react-icons/io5'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { Badge } from '../ui/badge'
import { IconButton } from '../ui/icon-button'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'

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
  /**
   * Handle apply button click
   */
  onApplyClick?: () => void
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
      <span> / {salaryTypeLabel[salaryType]}</span>
    </div>
  )
}

const JobView = forwardRef<HTMLDivElement, JobCardProps>(function JobView(
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
    onApplyClick,
  },
  ref
) {
  const formattedDate = getDateLabel(date)

  return (
    <div ref={ref} className={classNames('relative w-full px-4 py-4')}>
      <div>
        <div className="flex items-center space-x-2">
          <div className="flex-shrink-0">
            <Avatar type="square" size={6}>
              <AvatarImage src={companyAvatarUrl} />
              <AvatarFallback>{companyName}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col space-y-0 min-w-[1px]">
            <div className="text-sm flex flex-col">
              <div className="truncate">{companyName}</div>
            </div>
          </div>
        </div>

        <div className="font-bold text-3xl flex-grow min-w-[1px] pr-8 mt-1">
          {position}
        </div>

        <div>
          <div className="mt-1 text-muted-foreground space-y-0.5 grid grid-cols-2">
            <div className="flex items-center flex-shrink-0 gap-2">
              <IoBusinessOutline size={14} />
              <div>{locationTypeLabel[locationType]}</div>
            </div>
            <div className="flex items-center flex-shrink-0 gap-2">
              <IoLocationOutline size={14} />
              <div>{location}</div>
            </div>

            <div className="flex items-center flex-shrink-0 gap-2">
              <IoBriefcaseOutline size={14} />
              <div>{positionTermLabel[positionTerm]}</div>
            </div>

            <div className="flex items-center flex-shrink-0 gap-2">
              <IoPersonOutline size={14} />
              <div>{positionLevelLabel[positionLevel]}</div>
            </div>

            {salary && (
              <div className="flex items-center flex-shrink-0 gap-2">
                <IoPricetagOutline size={14} />
                <Salary salary={salary} salaryType={salaryType} />
              </div>
            )}
          </div>

          <div className="mt-3">
            <Button onClick={() => onApplyClick?.()}>Apply now</Button>
          </div>

          <Separator className="mt-3" />
          {description.length > 0 && (
            <p
              className="mt-5 text-with-html"
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
          )}

          <div className="text-sm text-muted-foreground mt-2">
            {formattedDate}
          </div>
        </div>

        {skills.length > 0 && (
          <>
            <Separator className="mt-3" />

            <div className="flex gap-1 flex-wrap mt-4">
              {skills.map((item) => (
                <Badge key={item} variant="secondary">
                  {item}
                </Badge>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="text-gray-600 absolute top-1 right-1">
        <IconButton onClick={() => onLikeClick?.()} className="p-2">
          {isLiked ? <IoBookmark size={20} /> : <IoBookmarkOutline size={20} />}
        </IconButton>
      </div>
    </div>
  )
})
JobView.displayName = 'JobView'

export default JobView
