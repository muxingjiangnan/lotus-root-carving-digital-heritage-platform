import axios from 'axios';
import { message } from 'antd';
import { logout } from '../store/slices/authSlice';
import { store } from '../store';

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000
});

request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

request.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status;
    const msg = error.response?.data?.message || '请求失败，请稍后重试';

    if (status === 401) {
      message.error('登录已过期，请重新登录');
      store.dispatch(logout());
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    } else {
      message.error(msg);
    }

    return Promise.reject(error);
  }
);

export default request;
