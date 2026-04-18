import request from './request'

/**
 * 课程管理相关接口
 */

/**
 * 获取课程列表（简化字段，用于列表展示）
 */
export function fetchCourseList() {
  return request({
    url: '/courses',
    method: 'GET'
  })
}

/**
 * 根据 ID 获取课程详情
 * @param {string} courseId 课程 ID
 */
export function fetchCourseById(courseId) {
  return request({
    url: `/courses/${courseId}`,
    method: 'GET'
  })
}

/**
 * 新增课程（管理员）
 * @param {Object} courseInfo 课程信息
 */
export function addCourse(courseInfo) {
  return request({
    url: '/courses',
    method: 'POST',
    data: courseInfo
  })
}

/**
 * 编辑课程信息（管理员）
 * @param {string} courseId 课程 ID
 * @param {Object} newCourseInfo 新的课程信息
 */
export function editCourse(courseId, newCourseInfo) {
  return request({
    url: `/courses/${courseId}`,
    method: 'PUT',
    data: newCourseInfo
  })
}

/**
 * 删除课程（管理员）
 * @param {string} courseId 课程 ID
 */
export function removeCourse(courseId) {
  return request({
    url: `/courses/${courseId}`,
    method: 'DELETE'
  })
}
