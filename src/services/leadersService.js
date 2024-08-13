import $api from "axiosHttp/api";

const getLeadersboard = async () => {
  const response = await $api.post('/get-leaderboard/');
  return response
}

export default {
  getLeadersboard,
}