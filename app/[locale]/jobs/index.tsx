'use client'

import { useEffect, useRef, useState } from 'react'

import {
  Position,
  Company,
  getRandomPosition,
  getRandomCompany,
} from '@/lib/fake-data'
import { cn, sleep } from '@/lib/utils'

import JobView from '@/components/parts/jobs/job-view'
import { Card } from '@/components/ui/card'
import { JobCardSkeleton } from '@/components/parts/jobs/job-card'

import JobList from './components/job-list'

const getFakeData = async () => {
  return [
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
}

type JobsPosition = Position & {
  company: Company
}

export default function Jobs() {
  const view = useRef<HTMLDivElement | null>(null)
  const [positions, setPositions] = useState<JobsPosition[]>([])
  const [selectedJobId, setSelectedJobId] = useState<null | string>(null)
  const [likedIds, setLikedIds] = useState<string[]>([])

  const selectedPosition = selectedJobId
    ? positions.find((item) => item.id === selectedJobId)
    : undefined

  const handleLikeClick = (id: string) => {
    if (likedIds.includes(id)) {
      setLikedIds(likedIds.filter((item) => item !== id))
    } else {
      setLikedIds([...likedIds, id])
    }
  }

  const handleItemClick = (id: string) => {
    view.current?.scrollTo(0, 0)
    setSelectedJobId(id)
  }

  const initData = async () => {
    await sleep(2000)
    const data = await getFakeData()
    setPositions(data)
  }

  useEffect(() => {
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setSelectedJobId(null)
    })

    initData()
  }, [])

  return (
    <main className="w-full h-[calc(100vh-60px)] overflow-hidden flex bg-muted relative">
      <div className="max-w-5xl flex-grow relative mx-auto h-full">
        <div
          className={cn(
            'w-[360px] flex-shrink-0 hidden md:block absolute inset-0 h-full flex-grow',
            'lg:border-b-0 lg:border-r-[1px]'
          )}
        >
          {positions.length === 0 ? (
            <ul className="space-y-3 overflow-y-auto h-full px-3 py-5">
              {Array.from({ length: 7 }, (_, i) => i + 1).map((_, key) => (
                // eslint-disable-next-line react/no-array-index-key
                <Card key={key}>
                  <JobCardSkeleton />
                </Card>
              ))}
            </ul>
          ) : (
            <JobList
              likedIds={likedIds}
              positions={positions}
              onItemClick={(id) => handleItemClick(id)}
              onLikeClick={handleLikeClick}
              selectedId={selectedJobId}
            />
          )}
        </div>
        <div className={cn('flex-grow min-w-1 w-full md:pl-[360px] h-full')}>
          <div className="px-3 py-5 w-full h-full overflow-x-auto" ref={view}>
            {selectedPosition ? (
              <Card>
                <JobView
                  {...selectedPosition}
                  position={selectedPosition.title}
                  companyName={selectedPosition.company.name}
                  companyAvatarUrl={selectedPosition.company.logo}
                  positionTerm={selectedPosition.term || 'full'}
                  positionLevel={selectedPosition.level || 'middle'}
                  locationType={selectedPosition.locationType || 'on-site'}
                  date="2024-08-12T16:15:53+02:00"
                  onApplyClick={() => {}}
                  isLiked={likedIds.includes(selectedPosition.id)}
                  onLikeClick={() => handleLikeClick(selectedPosition.id)}
                />
              </Card>
            ) : (
              <div className="text-xl h-full grid items-center justify-center text-muted-foreground">
                Click to job card to see details
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
