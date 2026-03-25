import axios from "axios";
import { isValidToken } from "./token";

export default function configAxios() {
  const token = localStorage.getItem("access_token");

  if (!token) return;
  if (!isValidToken(token)) localStorage.clear();
  axios.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
}
