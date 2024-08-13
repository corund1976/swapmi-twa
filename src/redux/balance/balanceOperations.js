/* eslint-disable camelcase */
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { setDisplayLoader } from 'redux/app/appSlice';
import { setDailyTickets, setDailyTokens, setTransferStatus, setWithdrawStatus } from 'redux/balance/balanceSlice';

import userOperations from 'redux/user/userOperations';

import balanceService from 'services/balanceService';

const getDailyReward = () => async dispatch => {
  try {
    dispatch(setDisplayLoader(true))

    const response = await balanceService.getDailyReward()
    const { rewards, attempts } = response.data

    dispatch(setDailyTokens(rewards))
    dispatch(setDailyTickets(attempts))
  } catch (e) {
    Notify.failure(e.response?.data?.message || 'Request GetDailyReward failure')
  } finally {
    dispatch(setDisplayLoader(false))
  }
}

const withdraw = (data) => async dispatch => {
  try {
    dispatch(setDisplayLoader(true))

    await balanceService.withdraw(data)

    dispatch(setWithdrawStatus('success'));

    dispatch(userOperations.getUser())
  } catch (e) {
    Notify.failure(e.response?.data?.message || 'Request Withdraw failure')
  } finally {
    dispatch(setDisplayLoader(false))
  }
}

const transferRewards = () => async dispatch => {
  try {
    dispatch(setDisplayLoader(true))

    await balanceService.transferRewards()

    dispatch(setTransferStatus('success'));
  } catch (e) {
    if (e.response.status === 400) {
      dispatch(setTransferStatus('no rewards to transfer'));
      return
    }

    Notify.failure(e.response?.data?.message || 'Request TransferRewards failure')
  } finally {
    dispatch(setDisplayLoader(false))
  }
}

export default {
  getDailyReward,
  withdraw,
  transferRewards,
}
