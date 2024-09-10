'use client'

import { sleep } from '@/lib/utils'

import { initialPositions, possibleCities } from './data'
import { State } from './types'

export const fetchJobsList = async (filters: State['filter']) => {
  const { query, cityId } = filters
  await sleep(1000) // Emulate request delay

  const cityQuery = cityId ? possibleCities[Number(cityId)].label : null // TODO

  return initialPositions.filter((item) => {
    const isCityMatched = cityQuery ? item.location === cityQuery : true
    const isQueryMatched = query
      ? item.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      : true

    const isExperienceTypeMatched =
      filters.level.length > 0 ? filters.level.includes(item.level) : true
    const isLocationTypeMatched =
      filters.locationType.length > 0 && item.locationType
        ? filters.locationType.includes(item.locationType)
        : true
    const isJobTypeMatched =
      filters.type.length > 0 ? filters.type.includes(item.type) : true

    return (
      isCityMatched &&
      isQueryMatched &&
      isExperienceTypeMatched &&
      isLocationTypeMatched &&
      isJobTypeMatched
    )
  })
}
