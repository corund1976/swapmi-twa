import $api from "axiosHttp/api";

const getDailyReward = async () => {
  const response = await $api.post('/set-daily-reward/');
  return response
}

const withdraw = async (data) => {
  const response = await $api.post('/withdrawal-game/', data);
  return response
}

const transferRewards = async () => {
  const response = await $api.post('/transfer-rewards/');
  return response
}

export default {
  getDailyReward,
  withdraw,
  transferRewards,
}