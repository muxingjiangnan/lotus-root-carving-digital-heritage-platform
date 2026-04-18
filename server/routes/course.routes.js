/**
 * 课程管理路由模块
 * 提供课程列表查询、详情查看、创建、更新、删除等接口
 * GET 接口公开访问，写操作需要管理员权限
 */
const express = require('express')
const courseController = require('../controllers/course.controller')
const verifyToken = require('../middlewares/verifyToken')
const requireAdmin = require('../middlewares/requireAdmin')

const router = express.Router()

// 公开接口：获取课程列表
router.get('/', courseController.getCourseList)

// 公开接口：获取课程详情
router.get('/:id', courseController.getCourseDetail)

// 管理员接口：新增课程
router.post('/', verifyToken, requireAdmin, courseController.addCourse)

// 管理员接口：编辑课程
router.put('/:id', verifyToken, requireAdmin, courseController.editCourse)

// 管理员接口：删除课程
router.delete('/:id', verifyToken, requireAdmin, courseController.removeCourse)

module.exports = router
