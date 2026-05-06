import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message =
      err?.response?.data?.message ||
      err?.message ||
      'Server bilan bog‘lanishda xato';
    return Promise.reject(new Error(message));
  }
);

export default api;
