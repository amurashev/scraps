import { Action, State } from '../types'

import uiReducer from './ui'
import jobsReducer from './jobs'
import filterReducer from './filter'

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setSelectedJob': {
      return { ...state, selectedJobId: action.id }
    }

    default: {
      return {
        ...state,
        ui: uiReducer(state.ui, action),
        jobs: jobsReducer(state.jobs, action),
        filter: filterReducer(state.filter, action),
      }
    }
  }

  throw Error(`Unknown action: ${action.type}`)
}

export default reducer
