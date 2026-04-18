import request from './request'

/**
 * 用户管理相关接口（管理员）
 */

/**
 * 获取用户列表（支持关键词搜索）
 * @param {Object} params 查询参数
 * @param {number} [params.page] 当前页码
 * @param {number} [params.limit] 每页数量
 * @param {string} [params.keyword] 搜索关键词
 */
export function fetchUserList(params) {
  return request({
    url: '/users',
    method: 'GET',
    params
  })
}

/**
 * 修改用户角色
 * @param {string} userId 用户 ID
 * @param {string} role 新角色（user / admin）
 */
export function editUserRole(userId, role) {
  return request({
    url: `/users/${userId}/role`,
    method: 'PUT',
    data: { role }
  })
}

/**
 * 删除用户
 * @param {string} userId 用户 ID
 */
export function removeUser(userId) {
  return request({
    url: `/users/${userId}`,
    method: 'DELETE'
  })
}
