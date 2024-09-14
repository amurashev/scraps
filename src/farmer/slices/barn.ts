import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { State } from '../types'

const barnSlice = createSlice({
  name: 'barn',
  initialState: {} satisfies State['barn'],
  reducers: {
    addItemToBarn(
      state: Record<string, number>,
      action: PayloadAction<{ id: string }>
    ) {
      const { id } = action.payload
      state[id] = state[id] ? state[id] + 1 : 1
    },
  },
})

export const { addItemToBarn } = barnSlice.actions
export default barnSlice.reducer
