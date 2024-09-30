import { createSlice } from '@reduxjs/toolkit'

import { State } from '../types/state'

const slice = createSlice({
  name: 'time',
  initialState: {
    value: 0,
    isPaused: false,
  } as State['time'],
  reducers: {
    increaseDay: (state: State['time']) => {
      return {
        ...state,
        value: state.value + 1,
      }
    },
    togglePause: (state: State['time']) => {
      state.isPaused = !state.isPaused
    },
  },
})

export const { increaseDay, togglePause } = slice.actions
export default slice.reducer
