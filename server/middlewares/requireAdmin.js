const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: '权限不足，需要管理员身份' });
  }
  next();
};

module.exports = requireAdmin;
