import axios from 'axios';

console.log("VITE_BACKEND_URL:", import.meta.env.VITE_BACKEND_URL);

const baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 30000,
});
