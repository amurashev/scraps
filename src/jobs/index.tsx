'use client'

import { useEffect, useRef, useReducer } from 'react'
import useLocalStorageState from 'use-local-storage-state'

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
import { cn, isMobile } from '@/lib/utils'
import BackButton from './components/back-button'
import JobDetailsDrawer from './components/job-details-drawer'

export default function JobsPage() {
  const view = useRef<HTMLDivElement | null>(null)
  const [state, dispatch] = useReducer(reducer, defaultState)
  const [likedIds, setLikedIds] = useLocalStorageState<string[]>('likedJobs', {
    defaultValue: [],
  })

  const { selectedJobId, filter, jobs, ui } = state
  const { data, initialListAreFetching } = jobs
  const { mobileScreen } = ui

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

  const handleBackToList = () => {
    dispatch({ type: 'setSelectedJob', id: null })
  }

  // useEffect(() => {
  //   if (mobileScreen === 'details') {
  //     view.current?.scrollIntoView({ block: 'start' })
  //   }
  // }, [mobileScreen]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!initialListAreFetching) {
      if (data.length && selectedJobId !== data[0].id && !isMobile()) {
        dispatch({ type: 'setSelectedJob', id: data[0].id })
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
      if (e.key === 'Escape') {
        dispatch({ type: 'setSelectedJob', id: null })
      }
    })

    initData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main className="w-full bg-muted relative min-h-[100vh]">
      <div className="max-w-5xl flex flex-col flex-grow mx-auto py-4 px-2 md:px-4">
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
          <div className="flex flex-grow mt-0 py-0 min-h-0">
            <div
              className={cn(
                'w-full pt-4 flex-shrink-0 flex-grow-0',
                'md:w-[320px] lg:w-[360px]',
                {
                  'hidden md:block': mobileScreen === 'details',
                }
              )}
            >
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
            </div>
            <div
              className={cn(
                'flex-grow pt-4',
                'md:block md:sticky md:top-1 md:h-[calc(100vh-1rem)] md:ml-4',
                {
                  hidden: mobileScreen === 'list',
                }
              )}
              ref={view}
            >
              <div className="mb-2 md:hidden">
                <BackButton onClick={handleBackToList} />
              </div>

              {selectedPosition ? (
                <SelectedPosition
                  selectedPosition={selectedPosition}
                  isLiked={likedIds.includes(selectedPosition.id)}
                  onLikeClick={() => handleLikeClick(selectedPosition.id)}
                />
              ) : (
                <div className="text-xl h-full grid items-center justify-center text-muted-foreground">
                  Click to job card to see details
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {selectedPosition && isMobile() && (
        <JobDetailsDrawer
          isOpen={Boolean(selectedJobId)}
          selectedPosition={selectedPosition}
          isLiked={likedIds.includes(selectedPosition.id)}
          onLikeClick={() => handleLikeClick(selectedPosition.id)}
          onClose={handleBackToList}
        />
      )}
    </main>
  )
}
