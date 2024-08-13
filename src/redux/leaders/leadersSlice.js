import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list: null,
  fund: 0
}

export const leadersSlice = createSlice({
  name: 'leaders',
  initialState,
  reducers: {
    setLeadersList: (state, action) => { state.list = action.payload },
    setLeadersFund: (state, action) => { state.fund = action.payload },

    resetLeaders: () => initialState,
  },
})

export const {
  setLeadersList,
  setLeadersFund,

  resetLeaders,
} = leadersSlice.actions

export default leadersSlice.reducer
