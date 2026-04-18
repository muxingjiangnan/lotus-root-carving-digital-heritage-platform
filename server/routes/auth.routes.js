/**
 * 用户认证路由模块
 * 提供注册、登录、获取当前用户等接口
 */
const express = require('express')
const { body } = require('express-validator')
const authController = require('../controllers/auth.controller')
const verifyToken = require('../middlewares/verifyToken')

const router = express.Router()

// 用户注册（含表单校验）
router.post(
  '/register',
  [
    body('username').trim().isLength({ min: 3 }).withMessage('用户名至少3个字符'),
    body('password').isLength({ min: 6 }).withMessage('密码至少6个字符')
  ],
  authController.register
)

// 用户登录（含表单校验）
router.post(
  '/login',
  [
    body('username').notEmpty().withMessage('用户名不能为空'),
    body('password').notEmpty().withMessage('密码不能为空')
  ],
  authController.login
)

// 获取当前登录用户信息（需要认证）
router.get('/me', verifyToken, authController.getCurrentUser)

module.exports = router
