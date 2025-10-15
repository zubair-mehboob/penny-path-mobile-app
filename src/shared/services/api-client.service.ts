// src/api/apiClient.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../constants/config";

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
    const token = await getToken(); // function to get token (you’ll define it)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ❌ Global error handler
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized — redirect to login");
    }
    return Promise.reject(error);
  }
);

async function getToken() {
  try {
    const token = await AsyncStorage.getItem("token");
    return token ? JSON.parse(token) : null;
  } catch (e) {
    return null;
  }
}

export default apiClient;
