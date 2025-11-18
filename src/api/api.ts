import axios from "axios";
import authService from "@/api/auth";
import { config } from "@/config";

const api = axios.create({
  baseURL: config.apiUrl,
});

api.interceptors.request.use(async (config) => {
  const user = await authService.getUser();
  if (user && !user.expired) {
    config.headers.Authorization = `Bearer ${user.access_token}`;
  }
  return config;
});

export default api;
