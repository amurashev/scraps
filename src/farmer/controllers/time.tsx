'use client'

import { useEffect } from 'react'

import { useAppDispatch } from '../hooks/redux'

import { increaseDay } from '../slices/day'

export default function TimeController() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(increaseDay())
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [dispatch])

  return null
}
