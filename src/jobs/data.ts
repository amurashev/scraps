import { JobLevel, JobLocationType, JobsPosition, JobType } from './types'

import { getRandomPosition, getRandomCompany } from '@/lib/fake-data'

export const initialPositions: JobsPosition[] = [
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

export const possibleCities = initialPositions.map((item, key) => ({
  id: key.toString(),
  label: item.location,
}))

export const experienceLevel: {
  id: JobLevel
  label: string
}[] = [
  {
    id: 'entry',
    label: 'Entry',
  },
  {
    id: 'middle',
    label: 'Middle',
  },
  {
    id: 'senior',
    label: 'Senior',
  },
]

export const remote: {
  id: JobLocationType
  label: string
}[] = [
  {
    id: 'remote',
    label: 'Remote',
  },
  {
    id: 'on-site',
    label: 'On site',
  },
  {
    id: 'hybrid',
    label: 'Hybrid',
  },
]

export const jobType: {
  id: JobType
  label: string
}[] = [
  {
    id: 'full',
    label: 'Full-time',
  },
  {
    id: 'part',
    label: 'Part-time',
  },
  {
    id: 'contract',
    label: 'Contract',
  },
]
