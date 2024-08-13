import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  // accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMSwiZXhwIjoxNzIyMzcyNDU3LCJpYXQiOjE3MjIzNTgwNTd9.S5Wd7EKwmgXiAH1uMDpbJZS7DrIEcrKp1ZfEwReaHfU",
  // isAuthorized: true,
  accessToken: null,
  isAuthorized: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action) => { state.accessToken = action.payload },
    setAuthorized: (state, action) => { state.isAuthorized = action.payload },

    resetAuth: () => initialState,
  },
})

export const {
  setAccessToken,
  setAuthorized,

  resetAuth,
} = authSlice.actions

export default authSlice.reducer