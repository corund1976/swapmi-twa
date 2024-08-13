import $api from "axiosHttp/api";

const getFriendsList = async () => {
  const response = await $api.post('/get-partners-tma/');
  return response
}

export default {
  getFriendsList,
}