import { Position, Company } from '@/lib/fake-data'

export type JobsPosition = Position & {
  company: Company
}

export type Filters = {
  query: string
  cityId: string | null
}
