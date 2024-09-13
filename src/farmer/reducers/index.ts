import { Action, State } from '../types'

import seedsReducer from './seeds'
import gridReducer from './grid'

function reducer(state: State, action: Action): State {
  switch (action.type) {
    default: {
      return {
        ...state,
        seeds: seedsReducer(state.seeds, action),
        grid: gridReducer(state.grid, action),
      }
    }
  }

  throw Error(`Unknown action: ${action.type}`)
}

export default reducer
