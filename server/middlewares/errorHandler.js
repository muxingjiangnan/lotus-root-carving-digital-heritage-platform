/**
 * 全局错误处理中间件
 * 统一捕获并格式化返回错误信息，避免在生产环境暴露敏感堆栈信息
 */
const errorHandler = (err, req, res, next) => {
  console.error(err.stack)

  const statusCode = err.statusCode || 500
  const errorMessage = err.message || '服务器内部错误'

  res.status(statusCode).json({ message: errorMessage })
}

module.exports = errorHandler
