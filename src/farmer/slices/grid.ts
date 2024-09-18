import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { State } from '../types'

const slice = createSlice({
  name: 'grid',
  initialState: {} satisfies State['grid'],
  reducers: {
    // plantSeed(
    //   state: State['grid'],
    //   action: PayloadAction<{ id: string; point: string }>
    // ) {
    //   const { id, point } = action.payload
    //   const { growthTime } = entities[id]
    //   const now = getNow()
    //   const growthTimeFinal =
    //     getRandomInteger(growthTime[0], growthTime[1]) * 0.05

    //   state[point] = {
    //     itemId: id,
    //     startGrowthTime: now,
    //     endGrowthTime: now + growthTimeFinal,
    //   }
    // },
    removePlant(
      state: State['grid'],
      action: PayloadAction<{ point: string }>
    ) {
      const { point } = action.payload
      state[point] = null
    },
  },
})

export const { removePlant } = slice.actions
export default slice.reducer
