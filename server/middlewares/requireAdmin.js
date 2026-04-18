/**
 * 管理员权限校验中间件
 * 确保当前登录用户具有管理员角色，否则返回 403 禁止访问
 */
const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: '权限不足，需要管理员身份' })
  }
  next()
}

module.exports = requireAdmin
