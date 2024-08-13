import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isFarming: false,

  progressReward: 0,
  progressPercent: 0,

  reward: 0,
}

export const farmingSlice = createSlice({
  name: 'farming',
  initialState,
  reducers: {
    setFarmingIsActive: (state, action) => { state.isFarming = action.payload },

    setFarmingProgressReward: (state, action) => { state.progressReward = action.payload },
    setFarmingProgressPercent: (state, action) => { state.progressPercent = action.payload },

    setFarmingReward: (state, action) => { state.reward = action.payload },

    resetFarming: () => initialState,
  },
})

export const {
  setFarmingIsActive,

  setFarmingProgressReward,
  setFarmingProgressPercent,

  setFarmingReward,

  resetFarming,
} = farmingSlice.actions

export default farmingSlice.reducer
