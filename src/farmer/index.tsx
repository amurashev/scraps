'use client'

import { useReducer } from 'react'

import Grid from './components/grid'

import defaultState from './state'
import reducer from './reducers'

import { StateContext } from './context'

export default function FarmerPage() {
  const [state, dispatch] = useReducer(reducer, defaultState)

  console.warn(state)

  return (
    <StateContext.Provider value={state}>
      <main className="h-[calc(100vh-60px)] bg-[#bfda95]">
        <Grid
          onPlantSeed={(id, point) => {
            dispatch({ type: 'plantSeed', id, point })
          }}
        />
      </main>
    </StateContext.Provider>
  )
}
