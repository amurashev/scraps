import { Action, State } from '../types'

function uiReducer(state: State['ui'], action: Action): State['ui'] {
  switch (action.type) {
    default: {
      return state
    }
  }
}

export default uiReducer
