import axios from 'axios';

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: Number(import.meta.env.VITE_REQUEST_TIMEOUT) || 10000,
  headers: {
    Accept: 'application/json',
  },
});
