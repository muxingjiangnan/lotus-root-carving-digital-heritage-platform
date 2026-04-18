import { createSlice } from '@reduxjs/toolkit'

// 从 localStorage 恢复登录态（页面刷新后保持登录）
const storedUser = localStorage.getItem('user')
const storedToken = localStorage.getItem('token')

/**
 * 认证状态切片
 * 管理用户登录态、Token、角色权限，并同步持久化到 localStorage
 */
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken || null,
    isAdmin: storedUser ? JSON.parse(storedUser).role === 'admin' : false
  },
  reducers: {
    /**
     * 用户登录
     * 保存用户信息到 state 和 localStorage
     */
    login(state, { payload }) {
      state.user = payload.user
      state.token = payload.token
      state.isAdmin = payload.user.role === 'admin'
      localStorage.setItem('user', JSON.stringify(payload.user))
      localStorage.setItem('token', payload.token)
    },
    /**
     * 用户登出
     * 清空 state 和 localStorage
     */
    logout(state) {
      state.user = null
      state.token = null
      state.isAdmin = false
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    }
  }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
