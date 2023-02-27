import axios from 'axios';
import TokenService from '../services/TokenService';

const SERVER_URL = 'https://rsclone-api.up.railway.app';
const api = axios.create({
  withCredentials: true,
  baseURL: `${SERVER_URL}/api`,
});
const tokenService = new TokenService();

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${tokenService.getAccessToken()}`;
  return config;
});

export default api;
