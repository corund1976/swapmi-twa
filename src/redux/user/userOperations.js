/* eslint-disable camelcase */
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { setDisplayDailyReward } from 'redux/app/appSlice';
import {
  setUserId,
  setUserAvatar,
  setUserReflink,
  resetUser,
  setUserRefcode,
} from 'redux/user/userSlice';
import { setTokens } from 'redux/balance/balanceSlice';
import { setTickets } from 'redux/game/gameSlice';
import { setFarmingIsActive, setFarmingReward } from 'redux/farming/farmingSlice';
import { setFriendsTicketsReward, setFriendsTokensReward } from 'redux/friends/friendsSlice';

import authOperations from 'redux/auth/authOperations';

import userService from 'services/userService';

const TELEGRAM_BOT_USERNAME = import.meta.env.VITE_TELEGRAM_BOT_USERNAME;

const getUser = () => async dispatch => {
  try {
    const response = await userService.getUser()

    const {
      is_active,
      user_id, avatar, ref_code,
      balance,
      attempts_count,
      daily_reward,
      referals_reward, referals_attempts,
      is_farming_now, farming_rewards
    } = response.data.data

    if (!is_active) {
      dispatch(authOperations.logout())
      return
    }

    dispatch(setUserId(user_id))
    dispatch(setUserAvatar(avatar));
    dispatch(setUserRefcode(ref_code));
    dispatch(setUserReflink(`https://t.me/${TELEGRAM_BOT_USERNAME}/?start=referal_code-${ref_code}`))

    dispatch(setTokens(balance))

    dispatch(setDisplayDailyReward(daily_reward))

    dispatch(setFriendsTokensReward(referals_reward))
    dispatch(setFriendsTicketsReward(referals_attempts))

    dispatch(setTickets(attempts_count))

    dispatch(setFarmingIsActive(is_farming_now))
    dispatch(setFarmingReward(farming_rewards))
  } catch (e) {
    if (e.response?.status === 429) {
      Notify.failure('Too much requests - try later ...')
      dispatch(resetUser())
      return
    }

    // Notify.failure(e.response?.data?.message || 'Request GetUser failure')
  }
}

export default {
  getUser,
}
