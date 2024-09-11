import { State } from './types'

const defaultState: State = {
  selectedJobId: null,
  ui: {
    mobileScreen: 'list',
    isApplyModalOpen: false,
  },
  jobs: {
    data: [],
    applied: [],
    ignored: [],
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
