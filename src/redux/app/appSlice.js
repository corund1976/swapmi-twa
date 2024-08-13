import { createSlice } from '@reduxjs/toolkit'
import WebApp from '@twa-dev/sdk';

const getLanguage = () => {
  const language = window?.localStorage?.getItem('swapmi-twa-language') || WebApp?.initDataUnsafe?.user?.language_code

  if (['EN', 'RU'].includes(language)) return language

  return 'EN'
}

const initialState = {
  screenHeight: 600,
  screenWidth: 1280,
  language: getLanguage(),

  platform: WebApp?.platform,
  version: WebApp?.version,

  displayLoader: false,
  displayModal: false,

  displayDailyReward: false,
  displayGameRules: true,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setScreenHeight: (state, action) => { state.screenHeight = action.payload },
    setScreenWidth: (state, action) => { state.screenWidth = action.payload },
    setLanguage: (state, action) => { state.language = action.payload },

    setDisplayLoader: (state, action) => { state.displayLoader = action.payload },
    setDisplayModal: (state, action) => { state.displayModal = action.payload },

    setDisplayDailyReward: (state, action) => { state.displayDailyReward = action.payload },
    setDisplayGameRules: (state, action) => { state.displayGameRules = action.payload },

    resetApp: () => initialState,
  }
})

export const {
  setScreenHeight,
  setScreenWidth,
  setLanguage,

  setDisplayLoader,
  setDisplayModal,

  setDisplayDailyReward,
  setDisplayGameRules,

  resetApp,
} = appSlice.actions

export default appSlice.reducer
