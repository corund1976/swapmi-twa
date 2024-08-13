/* eslint-disable camelcase */
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import {
  setFarmingProgressPercent,
  setFarmingProgressReward,
} from 'redux/farming/farmingSlice';

import userOperations from 'redux/user/userOperations';

import farmingService from 'services/farmingService';

const startFarming = () => async dispatch => {
  try {
    await farmingService.startFarming()
    dispatch(userOperations.getUser());
  } catch (e) {
    Notify.failure(e.response?.data?.message || 'Request StartFarming failure')
  }
}

const getFarmingProgress = () => async dispatch => {
  try {
    const response = await farmingService.getFarmingProgress()
    const { rewards, percent_progress } = response.data

    dispatch(setFarmingProgressReward(rewards));
    dispatch(setFarmingProgressPercent(percent_progress));
  } catch (e) {
    Notify.failure(e.response?.data?.message || 'Request GetFarmingProgress failure')
  }
}

const claimFarming = async () => {
  try {
    await farmingService.claimFarming()
  } catch (e) {
    Notify.failure(e.response?.data?.message || 'Request ClaimFarming failure')
  }
}

export default {
  startFarming,
  getFarmingProgress,
  claimFarming,
}
