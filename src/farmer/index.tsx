'use client'

import { useReducer } from 'react'

import Grid from './components/grid'

import defaultState from './state'
import reducer from './reducers'

export default function FarmerPage() {
  const [state, dispatch] = useReducer(reducer, defaultState)

  console.warn(dispatch)

  return (
    <main className="h-[calc(100vh-60px)] bg-[#bfda95]">
      <Grid state={state.grid} />
    </main>
  )
}
