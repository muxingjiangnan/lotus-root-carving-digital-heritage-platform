import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'

/**
 * Redux Store 配置入口
 */
export const store = configureStore({
  reducer: {
    auth: authReducer
  }
})
