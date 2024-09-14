import { configureStore } from '@reduxjs/toolkit'

import barnReducer from './slices/barn'
import gridReducer from './slices/grid'
import seedsReducer from './slices/seeds'
import daySlice from './slices/day'

import { State } from './types'

export const store = () =>
  configureStore({
    reducer: {
      barn: barnReducer,
      grid: gridReducer,
      seeds: seedsReducer,
      day: daySlice,
    },
  })

export type AppStore = ReturnType<typeof store>
export type RootState = State // ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
