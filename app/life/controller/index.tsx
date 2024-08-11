'use client'

import { useReducer } from 'react'

import defaultState from './state'
import reducer from './reducer'

import Form from '../components/form'
import Result from '../components/result'

function Life() {
  const [state, dispatch] = useReducer(reducer, defaultState)
  const { birthday, activeCycle, lifeCycle } = state

  return (
    <div className="w-full flex flex-col md:flex-row md:space-x-8">
      <div className="md:w-[260px] flex-shrink-0">
        <Form
          date={birthday}
          activeCycle={activeCycle}
          lifeCycle={lifeCycle}
          onChangeDate={(value) => dispatch({ type: 'changeDate', value })}
          onChangeActiveCycle={(value) =>
            dispatch({ type: 'changeActiveCycle', value })
          }
          onChangeLifeCycle={(value) =>
            dispatch({ type: 'changeLifeCycle', value })
          }
        />
      </div>
      <div className="flex-1">
        <Result
          birthday={birthday}
          activeCycle={activeCycle}
          lifeCycle={lifeCycle}
        />
      </div>
    </div>
  )
}

export default Life
