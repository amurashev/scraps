import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { State } from '../types'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    farmDetailsId: undefined,
    warehouseDetailsId: undefined,
  } satisfies State['ui'],
  reducers: {
    // toggleBarnModal(state: State['ui']) {
    //   state.isBarnOpened = !state.isBarnOpened
    // },
    toggleFarmDetailsModal(
      state: State['ui'],
      action: PayloadAction<string | undefined>
    ) {
      state.farmDetailsId = action.payload
    },
    toggleWarehouseDetailsModal(
      state: State['ui'],
      action: PayloadAction<string | undefined>
    ) {
      state.warehouseDetailsId = action.payload
    },
  },
})

export const { toggleFarmDetailsModal, toggleWarehouseDetailsModal } =
  uiSlice.actions
export default uiSlice.reducer
