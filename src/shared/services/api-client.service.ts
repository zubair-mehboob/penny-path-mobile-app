// src/api/apiClient.ts

import axios from "axios";
import { BASE_URL } from "../constants/config";
import { navigateToLogin } from "./navigation.service";
import { storageService } from "./storage.service";

const apiClient = axios.create({
  baseURL: `${BASE_URL}`, // adjust if your NestJS routes start with /api
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Automatically attach token
apiClient.interceptors.request.use(
  async (config) => {
    console.log("from request interceptor");
    const token = storageService.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log({ token, h: config.headers }, "ye to ra token bhai");
    return config;
  },
  (error) => Promise.reject(error)
);

// ❌ Global error handler
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized — redirect to login", { error });
      //navigateToLogin();
    }
    return Promise.reject(error);
  }
);

export default apiClient;
