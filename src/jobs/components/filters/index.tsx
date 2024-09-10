'use client'

import { useEffect, useState } from 'react'
import { IoSearch, IoLocationOutline } from 'react-icons/io5'

import { Button } from '@/components/ui/button'
import AutoComplete from '@/components/ui/autocomplete'

import { cn } from '@/lib/utils'

import { experienceLevel, jobType, remote } from '../../data'
import { JobLevel, JobLocationType, JobType, State } from '../../types'

import FilterDropdown from './filter-dropdown'

function FormInput({
  icon,
  children,
}: {
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="w-full h-10 space-x-2 flex items-center">
        <div className="flex-shrink-0">{icon}</div>
        {children}
      </div>
    </div>
  )
}

export default function Filters({
  filter,
  possibleCities,
  onSearchClick,
  onApplyClick,
}: {
  filter: State['filter']
  possibleCities: {
    id: string
    label: string
  }[]
  onSearchClick: (data: Pick<State['filter'], 'cityId' | 'query'>) => void
  onApplyClick: (
    data: Partial<Pick<State['filter'], 'level' | 'locationType' | 'type'>>
  ) => void
}) {
  const [query, setQuery] = useState(filter.query)
  const [selectedCityId, setSelectedCityId] = useState<string | null>(
    filter.cityId
  )

  useEffect(() => {
    if (query !== filter.query) {
      setQuery(filter.query)
    }

    if (selectedCityId !== filter.query) {
      setSelectedCityId(filter.cityId)
    }
  }, [filter]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="space-y-3">
      <div
        className={cn(
          'flex flex-col px-3 py-2 space-y-1 bg-background border border-border rounded-md',
          'md:pl-4 md:flex-row md:items-center md:space-x-3 md:space-y-0',
          'focus-within:ring-2 focus-within:ring-ring'
        )}
      >
        <div className="flex-grow ">
          <FormInput
            icon={<IoSearch size={22} className="text-muted-foreground" />}
          >
            <input
              className="ring-0 outline-0 h-full w-full bg-transparent"
              value={query}
              placeholder="Title or skill"
              onChange={(e) => setQuery(e.target.value)}
            />
          </FormInput>
        </div>
        <span className="h-[36px] w-[1px] bg-border  hidden md:flex">
          &nbsp;
        </span>
        <span className="h-[1px] w-full bg-border flex md:hidden">&nbsp;</span>
        <div className="flex-grow">
          <FormInput
            icon={
              <IoLocationOutline size={22} className="text-muted-foreground" />
            }
          >
            <AutoComplete
              placeholder="Select city"
              defaultValueId={selectedCityId}
              items={possibleCities}
              onChange={(id) => setSelectedCityId(id)}
            />
          </FormInput>
        </div>
        <Button
          className="flex-shrink-0"
          onClick={() => {
            onSearchClick({
              query,
              cityId: selectedCityId,
            })
          }}
        >
          Search
        </Button>
      </div>
      <div className="flex gap-1 flex-wrap md:gap-3">
        <FilterDropdown
          label="Experience level"
          items={experienceLevel}
          defaultValue={filter.level}
          onApplyClick={(newValues) => {
            onApplyClick({
              level: newValues as JobLevel[],
            })
          }}
        />
        <FilterDropdown
          label="Remote"
          items={remote}
          defaultValue={filter.locationType}
          onApplyClick={(newValues) => {
            onApplyClick({
              locationType: newValues as JobLocationType[],
            })
          }}
        />
        <FilterDropdown
          label="Job type"
          items={jobType}
          defaultValue={filter.type}
          onApplyClick={(newValues) => {
            onApplyClick({
              type: newValues as JobType[],
            })
          }}
        />

        <Button
          variant="ghost"
          size="lg"
          onClick={() =>
            onApplyClick({
              type: [],
              level: [],
              locationType: [],
            })
          }
          className="font-bold"
        >
          Reset
        </Button>
      </div>
    </div>
  )
}
