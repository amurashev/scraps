'use client'

import { useEffect } from 'react'

import Grid from './components/grid'

import StoreProvider from './StoreProvider'
import { useAppSelector, useAppDispatch } from './hooks'
import { increaseDay } from './slices/day'

function App() {
  const dispatch = useAppDispatch()
  useAppSelector((state) => state.day)

  console.warn('render')

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(increaseDay())
    }, 3000)

    return () => {
      clearInterval(interval)
    }
  }, [dispatch])

  return (
    <main className="h-[calc(100vh-60px)]">
      <Grid />
    </main>
  )
}

export default function FarmerPage() {
  return (
    <StoreProvider>
      <App />
    </StoreProvider>
  )
}
