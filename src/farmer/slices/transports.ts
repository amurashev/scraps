import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

import { State } from '../types/state'

const slice = createSlice({
  name: 'transports',
  initialState: [
    {
      id: 'CAR-001',
      type: 1,
    },
    {
      id: 'CAR-002',
      type: 2,
    },
    {
      id: 'CAR-003',
      type: 3,
    },
    {
      id: 'CAR-004',
      type: 4,
    },
  ] satisfies State['transports'],
  reducers: {},
})

// export const {  } = slice.actions
export default slice.reducer
