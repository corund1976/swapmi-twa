import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tickets: 0,
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setTickets: (state, action) => { state.tickets = action.payload },

    resetGame: () => initialState,
  },
})

export const {
  setTickets,

  resetGame,
} = gameSlice.actions

export default gameSlice.reducer
