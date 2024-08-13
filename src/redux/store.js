import { combineReducers, configureStore } from '@reduxjs/toolkit'

import appReducer from 'redux/app/appSlice'
import authReducer from 'redux/auth/authSlice'
import userReducer from 'redux/user/userSlice'
import balanceReducer from 'redux/balance/balanceSlice'
import leadersReducer from 'redux/leaders/leadersSlice'
import friendsReducer from 'redux/friends/friendsSlice'
import gameReducer from 'redux/game/gameSlice'
import farmingReducer from 'redux/farming/farmingSlice'

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  user: userReducer,
  balance: balanceReducer,
  leaders: leadersReducer,
  friends: friendsReducer,
  game: gameReducer,
  farming: farmingReducer,
})


const customizedMiddleware = (getDefaultMiddleware) =>
  getDefaultMiddleware({ serializableCheck: false })

const store = configureStore({
  reducer: rootReducer,
  middleware: customizedMiddleware,
  devTools: import.meta.env.VITE_NODE_ENV === 'development',
})

export default store