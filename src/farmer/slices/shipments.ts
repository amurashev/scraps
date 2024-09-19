import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { State } from '../types/state'
import { Day } from '../types'
import { Shipment, Cargo } from '../types/transport'

const slice = createSlice({
  name: 'shipments',
  initialState: [] as State['shipments'],
  reducers: {
    addShipment: (
      state: State['shipments'],
      action: PayloadAction<{
        from: string
        to: string
        transportId: string
        day: Day
        cargo: Cargo[]
      }>
    ) => {
      const { from, to, transportId, cargo, day } = action.payload

      return [
        ...state,
        {
          id: Date.now().toString(), // TODO
          from,
          to,
          transportId,
          shouldWait: false,
          cargoPlan: cargo,
          cargoShipment: [],
          status: 'new' as const,
          statusStartDay: day,
          statusDuration: 1,
        },
      ]
    },
    updateShipmentStatus: (
      state: State['shipments'],
      action: PayloadAction<{
        id: string
        status: Shipment['status']
        duration: number
        startDay: Day
        cargo?: Cargo[]
      }>
    ) => {
      const { id, status, duration, startDay, cargo } = action.payload

      return state.map((item) => {
        if (item.id === id) {
          const newItem = {
            ...item,
            status,
            statusDuration: duration,
            statusStartDay: startDay,
          } satisfies Shipment

          if (cargo) {
            newItem.cargoShipment = cargo
          }

          return newItem
        }

        return item
      })
    },
    deleteShipment: (
      state: State['shipments'],
      action: PayloadAction<string>
    ) => {
      return state.filter((item) => item.id !== action.payload)
    },
  },
})

export const { addShipment, deleteShipment, updateShipmentStatus } =
  slice.actions
export default slice.reducer
