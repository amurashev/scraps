import { ReadonlyURLSearchParams } from 'next/navigation'
import { State, JobLevel, JobLocationType, JobType } from './types'

export const filterToQuery = (
  filter: State['filter']
): Record<keyof State['filter'], string> => {
  return {
    query: filter.query,
    cityId: filter.cityId || '',
    level: filter.level.join(','),
    locationType: filter.locationType.join(','),
    type: filter.type.join(','),
  }
}

export const queryToFilter = (
  searchParams: ReadonlyURLSearchParams
): State['filter'] => {
  const queryFilter: State['filter'] = {
    query: searchParams.get('query') || '',
    cityId: searchParams.get('cityId') || null,
    level: searchParams.get('level')?.length
      ? (searchParams.get('level')?.split(',') as JobLevel[])
      : [],
    locationType: searchParams.get('locationType')?.length
      ? (searchParams.get('locationType')?.split(',') as JobLocationType[])
      : [],
    type: searchParams.get('type')
      ? (searchParams.get('type')?.split(',') as JobType[])
      : [],
  }

  return queryFilter
}
