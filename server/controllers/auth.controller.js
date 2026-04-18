const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const User = require('../models/User')

/**
 * 生成用户 JWT Token
 * @param {Object} user 用户文档对象
 * @returns {string} JWT 令牌
 */
const _generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )
}

/**
 * 用户注册
 * 校验表单 → 检查用户名唯一性 → 加密密码 → 创建用户 → 返回 Token
 */
async function register(req, res, next) {
  try {
    // 校验表单数据
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg })
    }

    const { username, password, phone, email } = req.body

    // 检查用户名是否已被注册
    const existedUser = await User.findOne({ username })
    if (existedUser) {
      return res.status(400).json({ message: '用户名已被注册' })
    }

    // 对密码进行哈希加密
    const hashedPassword = await bcrypt.hash(password, 10)

    // 创建新用户
    const user = await User.create({ username, passwordHash: hashedPassword, phone: phone || '', email: email || '' })

    // 生成认证令牌并返回
    const token = _generateToken(user)
    res.status(201).json({
      token,
      user: { _id: user._id, username: user.username, role: user.role }
    })
  } catch (error) {
    next(error)
  }
}

/**
 * 用户登录
 * 校验表单 → 查找用户 → 比对密码 → 返回 Token
 */
async function login(req, res, next) {
  try {
    // 校验表单数据
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg })
    }

    const { username, password } = req.body

    // 根据用户名查找用户
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(401).json({ message: '用户名或密码错误' })
    }

    // 校验密码是否正确
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash)
    if (!isPasswordValid) {
      return res.status(401).json({ message: '用户名或密码错误' })
    }

    // 生成认证令牌并返回
    const token = _generateToken(user)
    res.json({
      token,
      user: { _id: user._id, username: user.username, role: user.role }
    })
  } catch (error) {
    next(error)
  }
}

/**
 * 获取当前登录用户信息
 */
async function getCurrentUser(req, res, next) {
  try {
    const user = await User.findById(req.user.userId).select('-passwordHash')
    if (!user) {
      return res.status(404).json({ message: '用户不存在' })
    }
    res.json({ user })
  } catch (error) {
    next(error)
  }
}

/**
 * 更新个人资料（手机号、邮箱）
 */
async function updateProfile(req, res, next) {
  try {
    const { phone, email } = req.body
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { phone: phone || '', email: email || '' },
      { new: true, runValidators: true }
    ).select('-passwordHash')
    if (!user) {
      return res.status(404).json({ message: '用户不存在' })
    }
    res.json({ message: '资料更新成功', user })
  } catch (error) {
    next(error)
  }
}

/**
 * 修改密码
 */
async function updatePassword(req, res, next) {
  try {
    const { currentPassword, newPassword } = req.body
    const user = await User.findById(req.user.userId)
    if (!user) {
      return res.status(404).json({ message: '用户不存在' })
    }

    const isMatch = await bcrypt.compare(currentPassword, user.passwordHash)
    if (!isMatch) {
      return res.status(400).json({ message: '当前密码错误' })
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    user.passwordHash = hashedPassword
    await user.save()

    res.json({ message: '密码修改成功' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  register,
  login,
  getCurrentUser,
  updateProfile,
  updatePassword
}
