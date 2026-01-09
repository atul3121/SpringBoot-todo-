import api from "../api/axiosConfig";

export const login = (data) => {
  return api.post("/auth/login", data);
};

export const signup = (data) => {
  return api.post("/auth/signup", data);
};

export const logout = () => {
  return api.post("/auth/logout");
};

export const checkAuth = () => api.get("/auth/me");
