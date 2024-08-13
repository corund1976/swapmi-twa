/* eslint-disable camelcase */
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { setDisplayLoader } from 'redux/app/appSlice';
import { setLeadersFund, setLeadersList } from 'redux/leaders/leadersSlice';

import leadersService from 'services/leadersService';

const getLeadersboard = () => async dispatch => {
  try {
    dispatch(setDisplayLoader(true))

    const response = await leadersService.getLeadersboard()

    const { leaderboard_list_week, prize_fund } = response.data

    dispatch(setLeadersList(leaderboard_list_week));
    dispatch(setLeadersFund(prize_fund));
  } catch (e) {
    Notify.failure(e.response?.data?.message || 'Request GetLeadersboard failure')
  } finally {
    dispatch(setDisplayLoader(false))
  }
}

export default {
  getLeadersboard,
}
