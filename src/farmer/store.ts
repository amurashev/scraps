import { configureStore } from '@reduxjs/toolkit'

import daySlice from './slices/day'
import uiSlice from './slices/ui'
import moneySlice from './slices/money'
import farmsSlice from './slices/farms'
import warehousesSlice from './slices/warehouses'
import transportsSlice from './slices/transports'
import shipmentsSlice from './slices/shipments'
import roadsSlice from './slices/roads'
import editModeSlice from './slices/editMode'
import simpleBuildingsSlice from './slices/simpleBuildings'

import type { State } from './types/state'

export const store = () =>
  configureStore({
    reducer: {
      day: daySlice,
      ui: uiSlice,
      money: moneySlice,
      farms: farmsSlice,
      warehouses: warehousesSlice,
      transports: transportsSlice,
      shipments: shipmentsSlice,
      roads: roadsSlice,
      editMode: editModeSlice,
      simpleBuildings: simpleBuildingsSlice,
    },
  })

export type AppStore = ReturnType<typeof store>
export type RootState = State // ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
