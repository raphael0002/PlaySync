import axios from "axios";
import { removeCookie } from "@/lib/cookieUtils";

export const axiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Send cookies with requests
});

// Add response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof document !== "undefined") {
        removeCookie("token");
      }
      window.location.href = "/login";
    }
    return Promise.reject(error.response?.data || error);
  }
);
