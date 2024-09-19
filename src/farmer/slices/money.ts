import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { State } from '../types/state'

const daySlice = createSlice({
  name: 'money',
  initialState: 999999 satisfies State['money'],
  reducers: {
    increaseMoney: (state: State['money'], action: PayloadAction<number>) =>
      state + action.payload,
    reduceMoney: (state: State['money'], action: PayloadAction<number>) =>
      state - action.payload,
  },
})

export const { increaseMoney, reduceMoney } = daySlice.actions
export default daySlice.reducer
