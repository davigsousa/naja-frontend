import axios from 'axios';
import { getToken } from './auth';

const baseURL = 'https://estoque-naja.herokuapp.com/';

const api = axios.create({
  baseURL,
});

api.interceptors.request.use(async (config) => {
  const token = getToken();

  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }

  return config;
});

api.getBaseUrl = () => baseURL;

export default api;
