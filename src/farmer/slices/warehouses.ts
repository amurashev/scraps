import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { Warehouse } from '../types/buildings'
import { State } from '../types'

const slice = createSlice({
  name: 'warehouses',
  initialState: [
    {
      id: '1',
      name: 'Warehouse 1',
      capacity: 100,
      position: [2, 3],
      products: {},
    },
    // {
    //   id: '2',
    //   name: 'Warehouse 2',
    //   capacity: 50,
    //   products: {},
    // },
  ] satisfies State['warehouses'],
  reducers: {
    putToWarehouse: (
      state: State['warehouses'],
      action: PayloadAction<{
        warehouseId: string
        productId: string
        count: number
      }>
    ) => {
      const { warehouseId, productId, count } = action.payload

      return state.map((item) => {
        if (item.id === warehouseId) {
          return {
            ...item,
            products: {
              ...item.products,
              [productId]: item.products[productId]
                ? item.products[productId] + count
                : count,
            },
          } satisfies Warehouse
        }

        return item
      })
    },
  },
})

export const { putToWarehouse } = slice.actions
export default slice.reducer
