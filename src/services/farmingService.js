import $api from "axiosHttp/api";

const startFarming = async () => {
  const response = await $api.post('/start-farming/');
  return response
}

const getFarmingProgress = async () => {
  const response = await $api.post('/get-farming-progress/');
  return response
}

const claimFarming = async () => {
  const response = await $api.post('/claim-farming/');
  return response
}

export default {
  startFarming,
  getFarmingProgress,
  claimFarming,
}