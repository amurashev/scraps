import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { getRandomInteger } from '../utils/random'
import { getNow } from '../utils/time'

import entities from '../data/items'

import { State } from '../types'
import { Farm } from '../types/buildings'

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
        farmId: string
        productId: string
        cycles: number | undefined
        power: number
        warehouseId: string
      }>
    ) => {
      const { farmId, productId, cycles, power, warehouseId } = action.payload
      const { growthTime } = entities[productId]
      const now = getNow()
      const timeFinal = Math.floor(
        getRandomInteger(growthTime[0], growthTime[1]) * 0.03
      )

      return state.map((item) => {
        if (item.id === farmId) {
          return {
            ...item,
            warehouseId,
            producing: {
              status: 'active',
              productId,
              startTime: now,
              endTime: now + timeFinal,
              power,
              cycles,
            },
          } satisfies Farm
        }

        return item
      })
    },
    restartProducing: (
      state: State['farms'],
      action: PayloadAction<{ farmId: string; productId: string }>
    ) => {
      const { farmId, productId } = action.payload
      const { growthTime } = entities[productId]
      const now = getNow()
      const timeFinal = Math.floor(
        getRandomInteger(growthTime[0], growthTime[1]) * 0.1
      )

      return state.map((item) => {
        if (item.id === farmId) {
          return {
            ...item,
            producing: {
              productId,
              startTime: now,
              endTime: now + timeFinal,
              power: 8,
              cycles: undefined,
              status: 'active',
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
