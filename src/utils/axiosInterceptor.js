// src/utils/axiosInterceptor.js
import axios from "axios";
import store from "../redux/store";
import { refreshToken } from "../redux/actions/authActions";

const api = axios.create({
  baseURL: "http://localhost:3000", // Point to your backend
});

api.interceptors.request.use(
  (config) => {
    const { auth } = store.getState();
    if (auth.accessToken) {
      config.headers.Authorization = `Bearer ${auth.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { payload } = await store.dispatch(refreshToken());
        if (payload?.accessToken) {
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${payload.accessToken}`;
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${payload.accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        store.dispatch({ type: "LOGOUT" });
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
