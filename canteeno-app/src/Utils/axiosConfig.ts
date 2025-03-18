import axios from "axios";
import store from "../Common/Slices/Store";
import { startLoading, stopLoading } from "../Common/Slices/LoadingSlice";
import {
  clearErrorMessage,
  setErrorMessage,
} from "../Common/Slices/ErrorMessage";

const axiosInstance = axios.create({
  baseURL: "https://api.example.com", // Base URL for your API
  timeout: 10000, // Request timeout (in milliseconds)
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("userTeoken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    store.dispatch(clearErrorMessage());
    // Show loading screen
    store.dispatch(startLoading());
    return config;
  },
  (error) => {
    // Hide loading screen in case of request error
    store.dispatch(stopLoading());
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Hide loading screen
    store.dispatch(stopLoading());
    return response;
  },
  (error) => {
    // Hide loading screen in case of response error
    store.dispatch(stopLoading());
    if (error.response && error.response.status !== 200) {
      store.dispatch(
        setErrorMessage(error.response.data.message || "An error occurred")
      );
    }
    if (error.response?.status === 401) {
      console.error("Unauthorized! Redirecting to login...");
      // Handle logout or redirect logic
    }
    return Promise.resolve(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized! Redirecting to login...");
      // Handle logout or redirect logic
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
