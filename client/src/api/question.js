import request from './request'

/**
 * 互动问答相关接口
 */

/**
 * 提交问题（需要登录，提交后进入待审核状态）
 * @param {Object} questionInfo 问题信息
 */
export function addQuestion(questionInfo) {
  return request({
    url: '/questions',
    method: 'POST',
    data: questionInfo
  })
}

/**
 * 获取已通过审核的问题列表
 * @param {string} [category] 问题分类筛选
 */
export function fetchQuestionList(category) {
  return request({
    url: '/questions',
    method: 'GET',
    params: category ? { category } : {}
  })
}

/**
 * 获取全部问题列表（管理员后台审核用）
 */
export function fetchAllQuestionList() {
  return request({
    url: '/questions/admin',
    method: 'GET'
  })
}

/**
 * 根据 ID 获取问题详情
 * @param {string} questionId 问题 ID
 */
export function fetchQuestionById(questionId) {
  return request({
    url: `/questions/${questionId}`,
    method: 'GET'
  })
}

/**
 * 获取指定问题下的评论列表
 * @param {string} questionId 问题 ID
 */
export function fetchCommentList(questionId) {
  return request({
    url: `/questions/${questionId}/comments`,
    method: 'GET'
  })
}

/**
 * 发表评论（需要登录）
 * @param {string} questionId 问题 ID
 * @param {Object} commentInfo 评论信息
 */
export function addComment(questionId, commentInfo) {
  return request({
    url: `/questions/${questionId}/comments`,
    method: 'POST',
    data: commentInfo
  })
}

/**
 * 删除问题（作者或管理员）
 * @param {string} questionId 问题 ID
 */
export function removeQuestion(questionId) {
  return request({
    url: `/questions/${questionId}`,
    method: 'DELETE'
  })
}

/**
 * 删除评论（作者或管理员）
 * @param {string} questionId 问题 ID
 * @param {string} commentId 评论 ID
 */
export function removeComment(questionId, commentId) {
  return request({
    url: `/questions/${questionId}/comments/${commentId}`,
    method: 'DELETE'
  })
}

/**
 * 审核问题（管理员）
 * @param {string} questionId 问题 ID
 * @param {Object} auditInfo 审核信息（status / answer）
 */
export function reviewQuestion(questionId, auditInfo) {
  return request({
    url: `/questions/${questionId}/audit`,
    method: 'PUT',
    data: auditInfo
  })
}
