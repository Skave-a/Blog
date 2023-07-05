import axios from "axios";

// export const baseURL = "http://localhost:3002";
export const baseURL = "http://blog-client-nu-nine.onrender.com";
// export const baseURL = "https://blog-three-eta-22.vercel.app";

const instance = axios.create({
  baseURL: `${baseURL}/api`,

});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");

  return config;
});

export default instance;
