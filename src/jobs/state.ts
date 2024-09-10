import { State } from './types'

const defaultState: State = {
  selectedJobId: null,
  ui: {
    mobileScreen: 'list',
  },
  jobs: {
    data: [],
    initialListAreFetching: true,
    nextListAreFetching: false,
  },
  filter: {
    query: '',
    cityId: null,
    level: [],
    locationType: [],
    type: [],
  },
}

export default defaultState
