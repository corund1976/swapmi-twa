import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tokens: 0,

  dailyTokens: 0,
  dailyTickets: 0,

  withdrawStatus: null,
  transferStatus: null,
}

export const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    setTokens: (state, action) => { state.tokens = action.payload },

    setDailyTokens: (state, action) => { state.dailyTokens = action.payload },
    setDailyTickets: (state, action) => { state.dailyTickets = action.payload },

    setWithdrawStatus: (state, action) => { state.withdrawStatus = action.payload },
    setTransferStatus: (state, action) => { state.transferStatus = action.payload },

    resetBalance: () => initialState,
  },
})

export const {
  setTokens,

  setDailyTokens,
  setDailyTickets,

  setWithdrawStatus,
  setTransferStatus,

  resetBalance,
} = balanceSlice.actions

export default balanceSlice.reducer
