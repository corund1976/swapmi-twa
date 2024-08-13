import $api from "axiosHttp/api";

const getUser = async () => {
  const response = await $api.post('/get-bubbles-user/');
  return response
}

export default {
  getUser,
}