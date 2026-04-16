const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/auth.controller');
const verifyToken = require('../middlewares/verifyToken');

router.post(
  '/register',
  [
    body('username').trim().isLength({ min: 3 }).withMessage('用户名至少3个字符'),
    body('password').isLength({ min: 6 }).withMessage('密码至少6个字符')
  ],
  authController.register
);

router.post(
  '/login',
  [
    body('username').notEmpty().withMessage('用户名不能为空'),
    body('password').notEmpty().withMessage('密码不能为空')
  ],
  authController.login
);

router.get('/me', verifyToken, authController.getMe);

module.exports = router;
