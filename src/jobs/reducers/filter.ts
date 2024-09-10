import defaultState from '../state'
import { Action, State } from '../types'

function filterReducer(
  state: State['filter'],
  action: Action
): State['filter'] {
  switch (action.type) {
    case 'setFilterValue': {
      return {
        ...state,
        ...action.value,
      }
    }
    case 'resetFilter': {
      return defaultState.filter
    }
    default: {
      return state
    }
  }
}

export default filterReducer
