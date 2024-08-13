import $api from "axiosHttp/api";

const getEncryptData = async () => {
  const response = await $api.post('/get-bubbles-data/');
  return response
}

const updateGameData = async (data) => {
  const response = await $api.post('/update-bubbles-user/', data);
  return response
}

export default {
  getEncryptData,
  updateGameData,
}