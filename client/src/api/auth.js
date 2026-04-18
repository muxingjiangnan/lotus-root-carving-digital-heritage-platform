import request from './request'

/**
 * 用户认证相关接口
 */

/**
 * 用户注册
 * @param {Object} registerInfo 注册信息
 * @param {string} registerInfo.username 用户名
 * @param {string} registerInfo.password 密码
 */
export function userRegister(registerInfo) {
  return request({
    url: '/auth/register',
    method: 'POST',
    data: registerInfo
  })
}

/**
 * 用户登录
 * @param {Object} loginInfo 登录信息
 * @param {string} loginInfo.username 用户名
 * @param {string} loginInfo.password 密码
 */
export function userLogin(loginInfo) {
  return request({
    url: '/auth/login',
    method: 'POST',
    data: loginInfo
  })
}

/**
 * 获取当前登录用户信息
 */
export function fetchCurrentUser() {
  return request({
    url: '/auth/me',
    method: 'GET'
  })
}

/**
 * 更新个人资料（手机号、邮箱）
 * @param {Object} profileInfo
 * @param {string} [profileInfo.phone] 手机号
 * @param {string} [profileInfo.email] 邮箱
 */
export function updateProfile(profileInfo) {
  return request({
    url: '/auth/profile',
    method: 'PUT',
    data: profileInfo
  })
}

/**
 * 修改密码
 * @param {Object} passwordInfo
 * @param {string} passwordInfo.currentPassword 当前密码
 * @param {string} passwordInfo.newPassword 新密码
 */
export function updatePassword(passwordInfo) {
  return request({
    url: '/auth/password',
    method: 'PUT',
    data: passwordInfo
  })
}
