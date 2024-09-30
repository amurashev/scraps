import { createSlice } from '@reduxjs/toolkit'

import { State } from '../types/state'

const slice = createSlice({
  name: 'simpleBuildings',
  initialState: [
    {
      id: '1',
      name: 'Town Hall',
      type: 'hall',
      position: [30, 30],
    },
    {
      id: '2',
      name: 'Town Hall',
      type: 'shop',
      position: [34, 30],
    },
    {
      id: '3',
      name: '',
      type: 'house',
      subType: 2,
      position: [26, 30],
    },
    {
      id: '4',
      name: '',
      type: 'house',
      subType: 2,
      position: [30, 26],
    },
    {
      id: '5',
      name: '',
      type: 'house',
      subType: 2,
      position: [30, 34],
    },
    {
      id: '6',
      name: '',
      type: 'house',
      subType: 2,
      position: [34, 34],
    },
    {
      id: '6',
      name: '',
      type: 'house',
      subType: 2,
      position: [26, 26],
    },
    {
      id: '6',
      name: '',
      type: 'house',
      subType: 2,
      position: [26, 34],
    },
  ] as State['simpleBuildings'],
  reducers: {},
})

// export const { startProducing, endProducing, createFarm } = slice.actions
export default slice.reducer
