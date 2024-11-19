import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGlobalErrorStore } from "@/components/GlobalError";
export const BASE_URL = "http://192.168.1.65:5000/api";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => {
    if ("token" in response.data) {
      AsyncStorage.setItem("token", response.data.token);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosInstance;
