import axios from "axios";

// Set VITE_API_URL in .env when the backend is deployed somewhere else.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5002/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token && token !== "true") {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
