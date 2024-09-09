'use client'

import { useEffect, useState } from 'react'
import { IoSearch, IoLocationOutline } from 'react-icons/io5'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import AutoComplete from '@/components/ui/autocomplete'

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
  filters,
  possibleCities,
  onSearchClick,
}: {
  filters: {
    query: string
    cityId: string | null
  }
  possibleCities: {
    id: string
    label: string
  }[]
  onSearchClick: (data: {
    query: string
    selectedCityId: string | null
  }) => void
}) {
  const [query, setQuery] = useState(filters.query)
  const [selectedCityId, setSelectedCityId] = useState<string | null>(
    filters.cityId
  )

  useEffect(() => {
    if (query !== filters.query) {
      setQuery(filters.query)
    }

    if (selectedCityId !== filters.query) {
      setSelectedCityId(filters.cityId)
    }
  }, [filters]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Card className="flex items-center p-2 pl-4 space-x-3">
      <div className="flex-grow">
        <FormInput
          icon={<IoSearch size={22} className="text-muted-foreground" />}
        >
          <input
            className="ring-0 outline-0 h-full w-full"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </FormInput>
      </div>
      <span className="h-[36px] w-[1px] bg-border flex">&nbsp;</span>
      <div className="flex-grow">
        <FormInput
          icon={
            <IoLocationOutline size={22} className="text-muted-foreground" />
          }
        >
          <AutoComplete
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
            selectedCityId,
          })
        }}
      >
        Search
      </Button>
    </Card>
  )
}
