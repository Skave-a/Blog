import axios from "axios";

export const baseURL = "https://blog-client-nu-nine.onrender.com";

const instance = axios.create({
  baseURL: `${baseURL}/api`,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");

  return config;
});

export default instance;
