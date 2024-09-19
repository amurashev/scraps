import { createSlice } from '@reduxjs/toolkit'

import { State } from '../types/state'

const daySlice = createSlice({
  name: 'day',
  initialState: 0 satisfies State['day'],
  reducers: {
    increaseDay: (state: State['day']) => state + 1,
  },
})

export const { increaseDay } = daySlice.actions
export default daySlice.reducer
