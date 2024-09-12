import { Action, State } from '../types'

function reducer(state: State, action: Action): State {
  switch (action.type) {
    default: {
      return {
        ...state,
      }
    }
  }

  throw Error(`Unknown action: ${action.type}`)
}

export default reducer
