import request from './request'

/**
 * 非遗展厅相关接口
 */

/**
 * 获取展厅信息
 */
export function fetchExhibitionInfo() {
  return request({
    url: '/exhibition',
    method: 'GET'
  })
}

/**
 * 更新展厅信息（管理员）
 * @param {Object} exhibitionInfo 展厅信息
 */
export function editExhibition(exhibitionInfo) {
  return request({
    url: '/exhibition',
    method: 'PUT',
    data: exhibitionInfo
  })
}
