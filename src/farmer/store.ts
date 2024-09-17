import { configureStore } from '@reduxjs/toolkit'

// import barnReducer from './slices/barn'
// import gridReducer from './slices/grid'
// import seedsReducer from './slices/seeds'
import daySlice from './slices/day'
import uiSlice from './slices/ui'
import moneySlice from './slices/money'
import farmsSlice from './slices/farms'
import warehousesSlice from './slices/warehouses'

import { State } from './types'

export const store = () =>
  configureStore({
    reducer: {
      // barn: barnReducer,
      // grid: gridReducer,
      // seeds: seedsReducer,
      day: daySlice,
      ui: uiSlice,
      money: moneySlice,
      farms: farmsSlice,
      warehouses: warehousesSlice,
    },
  })

export type AppStore = ReturnType<typeof store>
export type RootState = State // ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
