import axios from 'axios';

export const httpClient = axios.create({
  timeout: 10_000,
  headers: {
    Accept: 'application/json',
  },
});
