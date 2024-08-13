import { createSlice } from '@reduxjs/toolkit'
import WebApp from '@twa-dev/sdk';

const initialState = {
  id: 0,
  avatar: null,
  refCode: '',
  refLink: '',

  telegramName: WebApp?.initDataUnsafe?.user?.username || '...',
  telegramAvatar: WebApp?.initDataUnsafe?.user?.photo_url || null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: (state, action) => { state.id = action.payload },
    setUserAvatar: (state, action) => { state.avatar = action.payload },
    setUserRefcode: (state, action) => { state.refCode = action.payload },
    setUserReflink: (state, action) => { state.refLink = action.payload },

    resetUser: () => initialState,
  },
})

export const {
  setUserId,
  setUserAvatar,
  setUserRefcode,
  setUserReflink,

  resetUser,
} = userSlice.actions

export default userSlice.reducer
