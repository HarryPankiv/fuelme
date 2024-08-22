import axios from 'axios';

const baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
});
