import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_RAILWAY_URL;
const api = axios.create({
  withCredentials: true,
  baseURL: `${SERVER_URL}/api`,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
  return config;
});

export default api;
