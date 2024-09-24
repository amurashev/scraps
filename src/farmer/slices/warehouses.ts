import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import type { Warehouse } from '../types/buildings'
import type { State } from '../types/state'
import type { Product } from '../types/products'

const slice = createSlice({
  name: 'warehouses',
  initialState: [
    {
      id: '1',
      name: 'Shop Warehouse',
      capacity: 100,
      position: [21, 21],
      products: {},
    },
    {
      id: '2',
      name: 'Warehouse 1',
      capacity: 100,
      position: [11, 2],
      products: {
        '1': 5,
        '2': 5,
      },
    },
    // {
    //   id: '3',
    //   name: 'Warehouse 2',
    //   capacity: 100,
    //   position: [21, 2],
    //   products: {},
    // },
  ] as State['warehouses'],
  reducers: {
    putToWarehouse: (
      state: State['warehouses'],
      action: PayloadAction<{
        warehouseId: Warehouse['id']
        productsToPut: Record<Product['id'], number>
      }>
    ) => {
      const { warehouseId, productsToPut } = action.payload

      return state.map((item) => {
        if (item.id === warehouseId) {
          const newProducts = { ...item.products }
          Object.keys(productsToPut).forEach((productId) => {
            newProducts[productId] = newProducts[productId]
              ? newProducts[productId] + productsToPut[productId]
              : productsToPut[productId]
          })

          return {
            ...item,
            products: {
              ...item.products,
              ...newProducts,
            },
          } satisfies Warehouse
        }

        return item
      })
    },
    pickUpFromWarehouse: (
      state: State['warehouses'],
      action: PayloadAction<{
        warehouseId: string
        productsToPickUp: Record<Product['id'], number>
      }>
    ) => {
      const { warehouseId, productsToPickUp } = action.payload

      return state.map((item) => {
        if (item.id === warehouseId) {
          const newProducts = { ...item.products }
          Object.keys(productsToPickUp).forEach((productId) => {
            let countAfterPickUp = 0

            if (newProducts[productId]) {
              countAfterPickUp =
                newProducts[productId] - productsToPickUp[productId]
            } else {
              countAfterPickUp = 0
            }

            newProducts[productId] = countAfterPickUp
          })

          return {
            ...item,
            products: {
              ...item.products,
              ...newProducts,
            },
          } satisfies Warehouse
        }

        return item
      })
    },
  },
})

export const { putToWarehouse, pickUpFromWarehouse } = slice.actions
export default slice.reducer
