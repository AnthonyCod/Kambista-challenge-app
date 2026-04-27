import axios, { AxiosInstance, AxiosError } from 'axios';
import Constants from 'expo-constants';
import { useAuthStore } from '@/stores/authStore';

const apiBaseUrl = Constants.expoConfig?.extra?.apiBaseUrl || 'https://api.kambista.com/v1';

export const apiClient: AxiosInstance = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Unauthorized - logout user
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);
