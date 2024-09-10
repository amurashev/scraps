import { Position, Company } from '@/lib/fake-data'

export type JobsPosition = Position & {
  company: Company
}

export type JobLevel = 'entry' | 'middle' | 'senior'
export type JobLocationType = 'remote' | 'on-site' | 'hybrid'
export type JobType = 'full' | 'part' | 'contract'

export type State = {
  selectedJobId: string | null
  ui: {
    mobileScreen: 'list' | 'details'
  }
  jobs: {
    data: JobsPosition[]
    initialListAreFetching: boolean
    nextListAreFetching: boolean
  }
  filter: {
    query: string
    cityId: string | null
    level: JobLevel[]
    locationType: JobLocationType[]
    type: JobType[]
  }
}

export type Action =
  | { type: 'setSelectedJob'; id: string | null }
  // Ui
  | { type: 'changeMobileScreen'; screen: State['ui']['mobileScreen'] }
  // Filter
  | { type: 'setFilterValue'; value: Partial<State['filter']> }
  | { type: 'resetFilter' }
  // Conversations
  | { type: 'setInitialListFetchStatus'; value: boolean }
  | { type: 'setNextListFetchStatus'; value: boolean }
  | { type: 'resetList' }
  | { type: 'addJobsToList'; payload: JobsPosition[] }
