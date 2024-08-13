import $axios from "axiosHttp/axios";

const login = async (data) => {
  const response = await $axios.post('/core/login-tma', data);
  return response
}

export default {
  login,
}