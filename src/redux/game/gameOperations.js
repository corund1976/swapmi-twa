import { Notify } from 'notiflix/build/notiflix-notify-aio';
import CryptoJS from 'crypto-js';

import { setDisplayLoader } from 'redux/app/appSlice';

import userOperations from 'redux/user/userOperations';

import gameService from 'services/gameService';

const updateGameData = (user, newBalance) => async dispatch => {
  const { id, refCode } = user

  try {
    dispatch(setDisplayLoader(true))

    const response = await gameService.getEncryptData()
    const { data } = response

    const code = data.balance
    const index = data.attempts

    const md5_user_id = index === 0 ? id.toString() + code : id.toString()
    const md5_ref_code = index === 1 ? refCode + code : refCode
    const md5_balance = index === 2 ? newBalance.toString() + code : newBalance.toString()
    const md5_last_balance = index === 3 ? code + code : code

    const toHash = md5_user_id + md5_ref_code + md5_balance + md5_last_balance
    const hashMD5 = CryptoJS.MD5(toHash).toString()

    const requestData = {
      user_id: id,
      ref_code: refCode,
      balance: newBalance,
      last_balance: code,
      hash: hashMD5,
    }

    await gameService.updateGameData(requestData)

    dispatch(userOperations.getUser())
  } catch (e) {
    Notify.failure(e.response?.data?.message || 'Request UpdateGameData failure')
  } finally {
    dispatch(setDisplayLoader(false))
  }
}

export default {
  updateGameData,
}
