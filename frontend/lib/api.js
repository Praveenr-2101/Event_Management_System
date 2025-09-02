import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api",
});

console.log("🔍 API Base URL:", api.defaults.baseURL);

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token && token !== "undefined") {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        window.location.href = "/auth/login"; 
        return Promise.reject(error);
      }

      try {
        
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api"}/auth/refresh/`,
          { refresh: refreshToken }
        );

      
        localStorage.setItem("token", data.access);

        originalRequest.headers.Authorization = `Bearer ${data.access}`;
        return api(originalRequest);
      } catch (err) {
        console.log("Refresh token failed:", err);
        window.location.href = "/auth/login"; 
      }
    }

    return Promise.reject(error);
  }
);

export default api;
