import { Action, State } from '../types'

function jobsReducer(state: State['jobs'], action: Action): State['jobs'] {
  switch (action.type) {
    case 'setInitialListFetchStatus': {
      return {
        ...state,
        initialListAreFetching: action.value,
      }
    }
    case 'setNextListFetchStatus': {
      return {
        ...state,
        nextListAreFetching: action.value,
      }
    }
    case 'resetList': {
      return { ...state, data: [] }
    }
    case 'addJobsToList': {
      return { ...state, data: action.payload }
    }
    case 'addAppliedJob': {
      return { ...state, applied: [...state.applied, action.id] }
    }
    case 'addIgnoredJob': {
      return { ...state, ignored: [...state.ignored, action.id] }
    }

    default: {
      return state
    }
  }
}

export default jobsReducer
