import api from "./api";

export const login = ({ access, refresh }) => {
  localStorage.setItem("token", access);
  localStorage.setItem("refreshToken", refresh);
  window.dispatchEvent(new Event("authChange"));
};


export const logout = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      await api.post("/user/logout/", { refresh: refreshToken });
    }
  } catch (error) {
    console.error("Logout API failed:", error.response?.data || error.message);
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    window.dispatchEvent(new Event("authChange"));
    window.location.href = "/auth/login";
  }
};


export const isAuthenticated = () => {
  if (typeof window === "undefined") return false;

  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");

  if (!token && !refreshToken) return false;

  if (!token && refreshToken) return true;

  try {
    const [, payload] = token.split(".");
    const decoded = JSON.parse(atob(payload));
    return decoded.exp * 1000 > Date.now();
  } catch {
    return !!refreshToken;
  }
};