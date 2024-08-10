import { Action, State } from '../types'

import defaultState from './state'

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increaseQuestionIndex': {
      return { ...state, questionIndex: state.questionIndex + 1 }
    }
    case 'setUserAnswer': {
      return {
        ...state,
        userAnswers: {
          ...state.userAnswers,
          [action.index]: action.value,
        },
      }
    }
    case 'resetTest': {
      return defaultState
    }
    default: {
      return state
    }
  }

  throw Error(`Unknown action: ${action.type}`)
}

export default reducer
