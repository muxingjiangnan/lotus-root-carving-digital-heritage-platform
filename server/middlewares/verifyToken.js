const jwt = require('jsonwebtoken')

/**
 * JWT 认证中间件
 * 从请求头 Authorization 中提取 Bearer Token 并验证，
 * 验证成功后将解码后的用户信息挂载到 req.user，供后续中间件或控制器使用
 */
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization

  // 检查请求头中是否包含 Bearer 格式的 Token
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: '未提供认证令牌' })
  }

  // 提取 Bearer 后的 Token 字符串
  const token = authHeader.split(' ')[1]

  try {
    const decodedInfo = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decodedInfo
    next()
  } catch (error) {
    return res.status(401).json({ message: '令牌无效或已过期' })
  }
}

module.exports = verifyToken
