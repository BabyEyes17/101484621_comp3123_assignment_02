import axios from "axios";

export const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  "https://one01484621-comp3123-assignment-02.onrender.com/api/v1";

console.log("API_BASE_URL being used by axios:", API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
