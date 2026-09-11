import axios from "axios";
import keycloak from "../auth/keycloak";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (keycloak.token) {
    config.headers.Authorization = `Bearer ${keycloak.token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      keycloak.logout();
    }
    if (error.response && error.response.status === 403) {
      console.error("Access denied: You do not have permission to perform this action.");
    }

    return Promise.reject(error);
  }
);

export default api;