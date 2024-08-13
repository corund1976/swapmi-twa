import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { setDisplayLoader } from 'redux/app/appSlice';
import { setFriendsList } from 'redux/friends/friendsSlice';

import friendsService from 'services/friendsService';

const getFriendsList = () => async dispatch => {
  try {
    dispatch(setDisplayLoader(true))
    const response = await friendsService.getFriendsList()
    const { partners } = response.data
    dispatch(setFriendsList(partners));
  } catch (e) {
    Notify.failure(e.response?.data?.message || 'Request GetFriendsList failure')
  } finally {
    dispatch(setDisplayLoader(false))
  }
}

export default {
  getFriendsList,
}
