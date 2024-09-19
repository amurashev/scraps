import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { State } from '../types/state'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    farmDetailsId: undefined,
    warehouseDetailsId: undefined,
    isTransportModal: false,
    isShipmentModal: true,
  } satisfies State['ui'],
  reducers: {
    toggleTransportsModal(state: State['ui']) {
      state.isTransportModal = !state.isTransportModal
    },
    toggleShipmentModal(state: State['ui']) {
      state.isShipmentModal = !state.isShipmentModal
    },
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

export const {
  toggleFarmDetailsModal,
  toggleWarehouseDetailsModal,
  toggleTransportsModal,
  toggleShipmentModal,
} = uiSlice.actions
export default uiSlice.reducer
