// api.js
import axios from "axios";
import store from "../redux/store";

const api = axios.create({
  baseURL: "https://trendyserver.sovanrothnath.site/api"
});

api.interceptors.request.use(
  (config) => {
    // console.log("Request config:", config);
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

