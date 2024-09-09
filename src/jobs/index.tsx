'use client'

import { useEffect, useRef, useState } from 'react'
import useLocalStorageState from 'use-local-storage-state'

import { getRandomPosition, getRandomCompany } from '@/lib/fake-data'
import { sleep } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'

import JobList from './components/job-list'
import FiltersList from './components/filters'
import NoResult from './components/no-results'
import SelectedPosition from './components/selected-position'
import JobListSkeleton from './components/job-list-skeleton'

import { JobsPosition, Filters } from './types'

const initialPositions: JobsPosition[] = [
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
    location: getRandomPosition(0).location,
  },
  {
    ...getRandomPosition(5),
    company: getRandomCompany(5),
    location: getRandomPosition(1).location,
  },
]

const possibleCities = initialPositions.map((item, key) => ({
  id: key.toString(),
  label: item.location,
}))

const getFakeData = async (filters: {
  query: string
  cityId: string | null
}) => {
  const { query, cityId } = filters
  await sleep(1000) // Emulate request delay

  const cityQuery = cityId ? possibleCities[Number(cityId)].label : null // TODO

  return initialPositions.filter((item) => {
    const isCityMatched = cityQuery ? item.location === cityQuery : true
    const isQueryMatched = query
      ? item.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      : true

    return isCityMatched && isQueryMatched
  })
}

const defaultFilters = {
  query: '',
  cityId: null,
}

export default function JobsPage() {
  const view = useRef<HTMLDivElement | null>(null)
  const [isInitialListLoading, setIsInitialListLoading] = useState(true)
  const [positions, setPositions] = useState<JobsPosition[]>([])
  const [selectedJobId, setSelectedJobId] = useState<null | string>(null)

  const [likedIds, setLikedIds] = useLocalStorageState<string[]>('likedJobs', {
    defaultValue: [],
  })

  const [filters, setFilters] = useState<Filters>(defaultFilters)

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

  const handleSearch = async (data: {
    query: string
    selectedCityId: string | null
  }) => {
    const { query, selectedCityId } = data

    setFilters({
      query,
      cityId: selectedCityId,
    })
    setIsInitialListLoading(true)
    setSelectedJobId(null)

    const filteredPositions = await getFakeData({
      query,
      cityId: selectedCityId,
    })
    setPositions(filteredPositions)
    setIsInitialListLoading(false)
  }

  const handleReset = async () => {
    setFilters(defaultFilters)
    setIsInitialListLoading(true)

    await sleep(2000) // Emulate request delay
    setPositions(initialPositions)
    setIsInitialListLoading(false)
  }

  useEffect(() => {
    const initData = async () => {
      const data = await getFakeData(defaultFilters)
      setPositions(data)
      setIsInitialListLoading(false)
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setSelectedJobId(null)
    })

    initData()
  }, [])

  return (
    <main className="w-full bg-muted relative h-[calc(100vh-60px)] overflow-hidden">
      <div className="max-w-5xl flex flex-col flex-grow relative mx-auto h-full py-4">
        <div className="">
          <FiltersList
            filters={filters}
            possibleCities={possibleCities}
            onSearchClick={handleSearch}
          />
        </div>
        {!positions.length && !isInitialListLoading && (
          <NoResult onResetClick={handleReset} />
        )}
        {(Boolean(positions.length) || isInitialListLoading) && (
          <div className="flex flex-grow mt-4 py-0 min-h-0">
            <div className="w-[360px] flex-shrink-0 flex-grow-0">
              <ScrollArea className="h-full w-full pr-3">
                {isInitialListLoading ? (
                  <JobListSkeleton />
                ) : (
                  <JobList
                    likedIds={likedIds}
                    positions={positions}
                    onItemClick={(id) => handleItemClick(id)}
                    selectedId={selectedJobId}
                  />
                )}
              </ScrollArea>
            </div>
            <div className="flex-grow h-full ml-4" ref={view}>
              {selectedPosition ? (
                <ScrollArea className="h-full w-full">
                  <SelectedPosition
                    selectedPosition={selectedPosition}
                    isLiked={likedIds.includes(selectedPosition.id)}
                    onLikeClick={() => handleLikeClick(selectedPosition.id)}
                  />
                </ScrollArea>
              ) : (
                <div className="text-xl h-full grid items-center justify-center text-muted-foreground">
                  Click to job card to see details
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
