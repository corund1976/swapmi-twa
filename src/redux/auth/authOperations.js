/* eslint-disable camelcase */
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import CryptoJS from 'crypto-js';

import { setDisplayLoader } from 'redux/app/appSlice';

import { resetAuth, setAccessToken, setAuthorized } from 'redux/auth/authSlice';
import { resetUser } from 'redux/user/userSlice';
import { resetBalance } from 'redux/balance/balanceSlice';
import { resetFriends } from 'redux/friends/friendsSlice';
import { resetLeaders } from 'redux/leaders/leadersSlice';
import { resetGame } from 'redux/game/gameSlice';
import { resetFarming } from 'redux/farming/farmingSlice';

import authService from 'services/authService';

const WEBAPP_KEY = import.meta.env.VITE_WEBAPP_KEY

const login = ({ id, username, first_name }) => async dispatch => {
  try {
    dispatch(setDisplayLoader(true))

    const toHash = id.toString() + WEBAPP_KEY
    const hash = CryptoJS.MD5(toHash).toString()
    const data = {
      id,
      username,
      first_name,
      hash
    }
    const response = await authService.login(data)

    const { token } = response.data

    dispatch(setAccessToken(token))
    dispatch(setAuthorized(true))
  } catch (e) {
    Notify.failure(e.response?.data?.message || 'Request Login failure')
  } finally {
    dispatch(setDisplayLoader(false))
  }
}

const logout = () => async dispatch => {
  dispatch(resetFarming())
  dispatch(resetGame())
  dispatch(resetBalance())
  dispatch(resetLeaders())
  dispatch(resetFriends())
  dispatch(resetUser())
  dispatch(resetAuth())
}

export default {
  login,
  logout,
}
