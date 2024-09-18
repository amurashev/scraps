import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { getRandomInteger } from '../utils/random'

import products from '../data/items'

import { State } from '../types'
import { Farm } from '../types/buildings'
import { TIME_BOOST } from '../config/main'

const slice = createSlice({
  name: 'farms',
  initialState: [
    {
      id: '1',
      name: 'Farm 1',
      position: [1, 1],
    },
  ] satisfies State['farms'],
  reducers: {
    startProducing: (
      state: State['farms'],
      action: PayloadAction<{
        day: number
        farmId: string
        productId: string
        cycles: number | undefined
        power: number
        warehouseId: string
      }>
    ) => {
      const { farmId, productId, cycles, power, warehouseId, day } =
        action.payload
      const { growthTime } = products[productId]

      const timeFinal = Math.floor(
        getRandomInteger(growthTime[0], growthTime[1]) * TIME_BOOST
      )

      return state.map((item) => {
        if (item.id === farmId) {
          return {
            ...item,
            warehouseId,
            producing: {
              status: 'active',
              productId,
              startDay: day,
              endDay: day + timeFinal,
              power,
              cycles,
            },
          } satisfies Farm
        }

        return item
      })
    },
    endProducing: (
      state: State['farms'],
      action: PayloadAction<{ farmId: string }>
    ) => {
      const { farmId } = action.payload

      return state.map((item) => {
        if (item.id === farmId) {
          return {
            ...item,
            producing: undefined,
          } satisfies Farm
        }

        return item
      })
    },
  },
})

export const { startProducing, endProducing } = slice.actions
export default slice.reducer
