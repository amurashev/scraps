'use client'

import { useEffect, useRef, useReducer } from 'react'
import useLocalStorageState from 'use-local-storage-state'

import { ScrollArea } from '@/components/ui/scroll-area'

import JobList from './components/job-list'
import FiltersList from './components/filters'
import NoResult from './components/no-results'
import SelectedPosition from './components/selected-position'
import JobListSkeleton from './components/job-list-skeleton'

import defaultState from './state'
import reducer from './reducers'
import { possibleCities } from './data'
import { State } from './types'
import { fetchJobsList } from './requests'
import { Separator } from '@/components/ui/separator'

export default function JobsPage() {
  const view = useRef<HTMLDivElement | null>(null)
  const [state, dispatch] = useReducer(reducer, defaultState)
  const [likedIds, setLikedIds] = useLocalStorageState<string[]>('likedJobs', {
    defaultValue: [],
  })

  const { selectedJobId, filter, jobs } = state
  const { data, initialListAreFetching } = jobs

  const selectedPosition = selectedJobId
    ? data.find((item) => item.id === selectedJobId)
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

    dispatch({ type: 'setSelectedJob', id })
  }

  const handleApplyFilter = async (newValue: Partial<State['filter']>) => {
    dispatch({ type: 'setFilterValue', value: newValue })
    dispatch({ type: 'setInitialListFetchStatus', value: true })
    dispatch({ type: 'setSelectedJob', id: null })

    const filteredPositions = await fetchJobsList({
      ...filter,
      ...newValue,
    })

    dispatch({ type: 'addJobsToList', payload: filteredPositions })
    dispatch({ type: 'setInitialListFetchStatus', value: false })
  }

  const handleReset = async () => {
    dispatch({ type: 'resetFilter' })
    dispatch({ type: 'setInitialListFetchStatus', value: true })

    const newJobs = await fetchJobsList(defaultState.filter)

    dispatch({ type: 'addJobsToList', payload: newJobs })
    dispatch({ type: 'setInitialListFetchStatus', value: false })
  }

  useEffect(() => {
    if (!initialListAreFetching) {
      if (data.length && selectedJobId !== data[0].id) {
        handleItemClick(data[0].id)
      }
    }
  }, [initialListAreFetching]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const initData = async () => {
      dispatch({ type: 'setInitialListFetchStatus', value: true })

      const newJobs = await fetchJobsList(filter)
      dispatch({ type: 'addJobsToList', payload: newJobs })
      dispatch({ type: 'setInitialListFetchStatus', value: false })
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') dispatch({ type: 'setSelectedJob', id: null })
    })

    initData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main className="w-full bg-muted relative min-h-[100vh] overflow-hidden">
      <div className="max-w-5xl flex flex-col flex-grow relative mx-auto h-full py-4 px-2 md:px-4">
        <div className="">
          <FiltersList
            filter={filter}
            possibleCities={possibleCities}
            onSearchClick={handleApplyFilter}
            onApplyClick={handleApplyFilter}
          />
        </div>
        <Separator className="mt-4" />
        {!data.length && !initialListAreFetching && (
          <NoResult onResetClick={handleReset} />
        )}
        {(Boolean(data.length) || initialListAreFetching) && (
          <div className="flex flex-grow mt-0 py-0 min-h-0 h-[calc(100vh-28px)]">
            <div className="w-[360px] pt-4 lg:border-r lg:border-border flex-shrink-0 flex-grow-0">
              <ScrollArea className="h-full w-full pr-4">
                {initialListAreFetching ? (
                  <JobListSkeleton />
                ) : (
                  <JobList
                    likedIds={likedIds}
                    positions={data}
                    onItemClick={(id) => handleItemClick(id)}
                    selectedId={selectedJobId}
                  />
                )}
              </ScrollArea>
            </div>
            <div className="flex-grow h-full ml-4 pt-4" ref={view}>
              {selectedPosition ? (
                <ScrollArea className="h-full w-full pr-2">
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
