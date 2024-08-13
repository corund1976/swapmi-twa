import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list: null,

  ticketsReward: 0,
  tokensReward: 0,
}

export const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    setFriendsList: (state, action) => { state.list = action.payload },

    setFriendsTicketsReward: (state, action) => { state.ticketsReward = action.payload },
    setFriendsTokensReward: (state, action) => { state.tokensReward = action.payload },

    resetFriends: () => initialState,
  },
})

export const {
  setFriendsList,

  setFriendsTicketsReward,
  setFriendsTokensReward,

  resetFriends,
} = friendsSlice.actions

export default friendsSlice.reducer
