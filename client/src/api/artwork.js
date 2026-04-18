import request from './request'

/**
 * 作品管理相关接口
 */

/**
 * 获取作品列表（支持分类筛选和关键词搜索）
 * @param {Object} params 查询参数
 * @param {string} [params.category] 作品分类
 * @param {string} [params.keyword] 搜索关键词
 * @param {number} [params.page] 当前页码
 * @param {number} [params.limit] 每页数量
 */
export function fetchArtworkList(params) {
  return request({
    url: '/artworks',
    method: 'GET',
    params
  })
}

/**
 * 根据 ID 获取作品详情
 * @param {string} artworkId 作品 ID
 */
export function fetchArtworkById(artworkId) {
  return request({
    url: `/artworks/${artworkId}`,
    method: 'GET'
  })
}

/**
 * 新增作品（管理员）
 * @param {Object} artworkInfo 作品信息
 */
export function addArtwork(artworkInfo) {
  return request({
    url: '/artworks',
    method: 'POST',
    data: artworkInfo
  })
}

/**
 * 编辑作品信息（管理员）
 * @param {string} artworkId 作品 ID
 * @param {Object} newArtworkInfo 新的作品信息
 */
export function editArtwork(artworkId, newArtworkInfo) {
  return request({
    url: `/artworks/${artworkId}`,
    method: 'PUT',
    data: newArtworkInfo
  })
}

/**
 * 删除作品（管理员）
 * @param {string} artworkId 作品 ID
 */
export function removeArtwork(artworkId) {
  return request({
    url: `/artworks/${artworkId}`,
    method: 'DELETE'
  })
}
