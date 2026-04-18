/**
 * 用户管理路由模块（管理员）
 * 提供用户列表查询、角色修改、删除等接口
 * 所有接口均需要管理员权限
 */
const express = require('express')
const verifyToken = require('../middlewares/verifyToken')
const requireAdmin = require('../middlewares/requireAdmin')
const userController = require('../controllers/user.controller')

const router = express.Router()

// 该模块下所有路由均需管理员权限
router.use(verifyToken, requireAdmin)

// 获取用户列表（支持关键词搜索）
router.get('/', userController.getUserList)

// 修改用户角色
router.put('/:id/role', userController.editUserRole)

// 删除用户
router.delete('/:id', userController.removeUser)

module.exports = router
