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

// 更新个人资料（需要认证）
router.put(
  '/profile',
  verifyToken,
  [
    body('phone')
      .optional({ checkFalsy: true })
      .matches(/^1[3-9]\d{9}$/)
      .withMessage('请输入有效的手机号'),
    body('email')
      .optional({ checkFalsy: true })
      .isEmail()
      .withMessage('请输入有效的邮箱地址')
  ],
  authController.updateProfile
)

// 修改密码（需要认证）
router.put(
  '/password',
  verifyToken,
  [
    body('currentPassword').notEmpty().withMessage('请输入当前密码'),
    body('newPassword').isLength({ min: 6 }).withMessage('新密码至少6个字符')
  ],
  authController.updatePassword
)

module.exports = router
