import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api",
});

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    console.warn("No refresh token available");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    window.dispatchEvent(new Event("authChange"));
    throw new Error("No refresh token available");
  }

  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api"}/token/refresh/`,
      { refresh: refreshToken },
      { headers: { "Content-Type": "application/json" } }
    );
    localStorage.setItem("token", data.access);
    window.dispatchEvent(new Event("authChange"));
    return data.access;
  } catch (err) {
    console.log("Refresh token failed:", err.response?.data || err.message);
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    window.dispatchEvent(new Event("authChange"));

    if (typeof window !== "undefined") {
      window.location.href = "/auth/login";
    }
    throw err;
  }
};

const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const [, payload] = token.split(".");
    const decoded = JSON.parse(atob(payload));
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};


api.interceptors.request.use(async (config) => {
  let token = localStorage.getItem("token");
  if (token && isTokenExpired(token) && !config._retry) {
    config._retry = true;
    try {
      token = await refreshAccessToken();
    } catch {
      return Promise.reject("Cannot refresh token, user logged out");
    }
  }
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
