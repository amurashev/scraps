'use client'

import { useEffect, useRef, useReducer } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { useRouter, useSearchParams } from 'next/navigation'

import { useToast } from '@/components/ui/use-toast'
import { Separator } from '@/components/ui/separator'

import { jobsRoute } from '@/constants/routes'
import { cn, isMobile } from '@/lib/utils'

import JobList from './components/job-list'
import FiltersList from './components/filters'
import NoResult from './components/no-results'
import SelectedPosition from './components/selected-position'
import JobListSkeleton from './components/job-list-skeleton'
import JobDetailsDrawer from './components/job-details-drawer'
import { ApplyDialog } from './components/apply-dialog'

import defaultState from './state'
import reducer from './reducers'
import { possibleCities } from './data'
import { State } from './types'
import { fetchJobsList } from './requests'
import { filterToQuery, queryToFilter } from './utils'

export default function JobsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const view = useRef<HTMLDivElement | null>(null)
  const [state, dispatch] = useReducer(reducer, defaultState)
  const [likedIds, setLikedIds] = useLocalStorageState<string[]>('likedJobs', {
    defaultValue: [],
  })

  const { selectedJobId, filter, jobs, ui } = state
  const { data, initialListAreFetching, applied, ignored } = jobs
  const { mobileScreen, isApplyModalOpen } = ui

  const selectedPosition = selectedJobId
    ? data.find((item) => item.id === selectedJobId)
    : undefined

  const jobsToShow = data.filter(
    (item) => !applied.includes(item.id) && !ignored.includes(item.id)
  )

  const handleLikeClick = (id: string) => {
    if (likedIds.includes(id)) {
      setLikedIds((oldValues) => oldValues.filter((item) => item !== id))
    } else {
      setLikedIds((oldValues) => [...oldValues, id])
    }
  }

  const handleItemClick = (id: string) => {
    dispatch({ type: 'setSelectedJob', id })
  }

  const handleApplyFilter = async (newValue: Partial<State['filter']>) => {
    const actualFilter = {
      ...filter,
      ...newValue,
    }

    dispatch({ type: 'setFilterValue', value: newValue })
    dispatch({ type: 'setInitialListFetchStatus', value: true })
    dispatch({ type: 'setSelectedJob', id: null })

    const filteredPositions = await fetchJobsList(actualFilter)

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

  const onApplyClick = () => {
    dispatch({ type: 'setApplyModalOpen', value: true })
  }

  const handleApply = () => {
    dispatch({ type: 'setApplyModalOpen', value: false })

    if (selectedPosition) {
      toast({
        title: `You have applied to ${selectedPosition?.title} position`,
      })

      const index = jobsToShow.findIndex((item) => item.id === selectedJobId)

      if (index >= 0 && jobsToShow[index + 1]) {
        handleItemClick(jobsToShow[index + 1].id)
      } else {
        dispatch({ type: 'setSelectedJob', id: null })
      }

      dispatch({ type: 'addAppliedJob', id: selectedPosition?.id })
    }
  }

  const handleIgnore = () => {
    if (!selectedPosition) {
      return
    }

    toast({
      title: `You have hidden ${selectedPosition?.title} position`,
    })

    const index = jobsToShow.findIndex((item) => item.id === selectedJobId)

    if (index >= 0 && jobsToShow[index + 1]) {
      handleItemClick(jobsToShow[index + 1].id)
    } else {
      dispatch({ type: 'setSelectedJob', id: null })
    }

    dispatch({ type: 'addIgnoredJob', id: selectedPosition?.id })
  }

  const onApplyModalClose = () => {
    dispatch({ type: 'setApplyModalOpen', value: false })
  }

  useEffect(() => {
    router.push(
      jobsRoute.getUrl({
        query: filterToQuery(filter),
      })
    )
  }, [filter]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!initialListAreFetching) {
      if (
        jobsToShow.length &&
        selectedJobId !== jobsToShow[0].id &&
        !isMobile()
      ) {
        dispatch({ type: 'setSelectedJob', id: jobsToShow[0].id })
      }
    }
  }, [initialListAreFetching]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const keyboardEvents = function (e: KeyboardEvent) {
      if (e.key === 'Escape' && !isApplyModalOpen) {
        dispatch({ type: 'setSelectedJob', id: null })
      }

      // if (e.key === 'f' && selectedJobId) {
      //   handleLikeClick(selectedJobId)
      // }

      if (e.key === 'Enter' && selectedJobId) {
        // if (!isApplyModalOpen) {
        //   e.preventDefault()
        //   onApplyClick()
        // }
      }

      if (e.key === 'ArrowDown' && selectedJobId) {
        e.preventDefault()
        const index = jobsToShow.findIndex((item) => item.id === selectedJobId)

        if (index >= 0 && jobsToShow[index + 1]) {
          handleItemClick(jobsToShow[index + 1].id)
        }
      }

      if (e.key === 'ArrowUp' && selectedJobId) {
        e.preventDefault()
        const index = jobsToShow.findIndex((item) => item.id === selectedJobId)

        if (index >= 0 && jobsToShow[index - 1]) {
          handleItemClick(jobsToShow[index - 1].id)
        }
      }
    }

    document.addEventListener('keydown', keyboardEvents)

    return () => {
      document.removeEventListener('keydown', keyboardEvents)
    }
  }, [selectedJobId, likedIds, isApplyModalOpen]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const initData = async () => {
      const queryFilter = queryToFilter(searchParams)

      const finalFilters = {
        ...filter,
        ...queryFilter,
      }

      dispatch({ type: 'setFilterValue', value: finalFilters })
      dispatch({ type: 'setInitialListFetchStatus', value: true })

      const newJobs = await fetchJobsList(finalFilters)
      dispatch({ type: 'addJobsToList', payload: newJobs })
      dispatch({ type: 'setInitialListFetchStatus', value: false })
    }

    initData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main className="w-full bg-muted relative min-h-[100vh]">
      <div className="max-w-5xl flex flex-col flex-grow mx-auto py-4 px-2 md:px-4">
        <FiltersList
          filter={filter}
          possibleCities={possibleCities}
          onSearchClick={handleApplyFilter}
          onApplyClick={handleApplyFilter}
        />
        <Separator className="mt-4" />
        {!jobsToShow.length && !initialListAreFetching && (
          <NoResult onResetClick={handleReset} />
        )}
        {(Boolean(jobsToShow.length) || initialListAreFetching) && (
          <div className="flex flex-grow mt-0 py-0 min-h-0">
            <div
              className={cn(
                'w-full pt-4 flex-shrink-0 flex-grow-0',
                'md:w-[320px] lg:w-[360px]',
                {
                  'hidden md:block': mobileScreen === 'details',
                }
              )}
              data-test="jobs_list"
            >
              {initialListAreFetching ? (
                <JobListSkeleton />
              ) : (
                <JobList
                  likedIds={likedIds}
                  positions={jobsToShow}
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
              {selectedPosition ? (
                <SelectedPosition
                  selectedPosition={selectedPosition}
                  isLiked={likedIds.includes(selectedPosition.id)}
                  onLikeClick={() => handleLikeClick(selectedPosition.id)}
                  onApplyClick={onApplyClick}
                  onIgnoreClick={handleIgnore}
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

      {selectedPosition && (
        <ApplyDialog
          jobTitle={selectedPosition.title}
          companyName={selectedPosition.company.name}
          isOpen={isApplyModalOpen}
          onClose={onApplyModalClose}
          onApply={handleApply}
        />
      )}
    </main>
  )
}
