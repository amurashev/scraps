import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { State } from '../types'

const seedsSlice = createSlice({
  name: 'seeds',
  initialState: {
    '1': 10,
    '2': 5,
  } satisfies State['seeds'],
  reducers: {
    removeSeed(state: State['seeds'], action: PayloadAction<{ id: string }>) {
      const { id } = action.payload
      state[id] -= 1
    },
  },
})

export const { removeSeed } = seedsSlice.actions
export default seedsSlice.reducer
