import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { State } from '../types/state'

const slice = createSlice({
  name: 'roads',
  initialState: [
    [12, 5],
    [12, 6],
    [12, 7],
    [12, 8],
    [12, 10],
    [12, 9],
    [12, 11],
    [12, 12],
    [12, 13],
    [12, 14],
    [12, 15],
    [12, 16],
    [12, 17],
    [12, 18],
    [12, 19],
    [12, 20],
    [12, 21],
    [12, 22],
    [12, 23],
    [12, 24],

    [13, 18],
    [14, 18],
    [15, 18],
    [16, 18],
    [17, 18],

    [12, 24],
    [13, 24],
    [14, 24],
    [15, 24],
    [16, 24],
    [17, 24],
    [18, 24],
    [19, 24],
    [20, 24],
    [21, 24],
    [22, 24],
    [23, 24],
    [24, 24],
    [25, 24],
    [26, 24],

    [22, 25],
    [22, 26],
    [22, 27],
    [22, 28],

    // [16, 28],
    [17, 28],
    [18, 28],
    [19, 28],
    [20, 28],
    [21, 28],

    [17, 19],
    [17, 20],
    [17, 21],
    [17, 22],
    [17, 23],

    [12, 28],
    [12, 29],
    [12, 30],
    [12, 31],
    [12, 32],
    [12, 33],
  ] as State['roads'],
  reducers: {
    addRoad: (
      state: State['roads'],
      action: PayloadAction<[number, number]>
    ) => [...state, action.payload],
    toggleRoad: (
      state: State['roads'],
      action: PayloadAction<[number, number]>
    ) => {
      const hasRoad = Boolean(
        state.find(
          (item) =>
            item[0] === action.payload[0] && item[1] === action.payload[1]
        )
      )
      if (!hasRoad) {
        return [...state, action.payload]
      }

      return state.filter(
        (item) =>
          !(item[0] === action.payload[0] && item[1] === action.payload[1])
      )
    },
  },
})

export const { addRoad, toggleRoad } = slice.actions
export default slice.reducer
