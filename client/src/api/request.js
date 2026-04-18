import axios from 'axios'
import { message } from 'antd'
import { logout } from '../store/slices/authSlice'
import { store } from '../store'

/**
 * Axios 请求实例
 * 统一配置 baseURL、超时时间、请求/响应拦截器
 */
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000
})

// 请求拦截器：注入用户 Token
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    return config
  },
  (error) => Promise.reject(error)
)

// 响应拦截器：统一处理 401 过期和其他错误
service.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status
    const msg = error.response?.data?.message || '请求失败，请稍后重试'
    const config = error.config

    if (status === 401) {
      // 先显示后端返回的真实错误消息（如"用户名或密码错误"/"令牌无效"等）
      message.error(msg)
      // 只有非登录接口的 401 才执行登出跳转
      const url = config.url || ''
      if (!url.includes('/auth/login')) {
        store.dispatch(logout())
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = '/login'
      }
    } else {
      message.error(msg)
    }

    return Promise.reject(error)
  }
)

export default service
