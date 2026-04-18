const User = require('../models/User')

/**
 * 获取用户列表（管理员）
 * 支持关键词搜索用户名，分页返回
 */
async function getUserList(req, res, next) {
  try {
    const currentPage = Math.max(parseInt(req.query.page, 10) || 1, 1)
    const pageSize = Math.max(parseInt(req.query.limit, 10) || 10, 1)
    const searchKeyword = (req.query.keyword || '').trim()

    const queryFilter = {}
    if (searchKeyword) {
      queryFilter.username = { $regex: searchKeyword, $options: 'i' }
    }

    // 查询总数与分页数据
    const totalCount = await User.countDocuments(queryFilter)
    const userList = await User.find(queryFilter)
      .select('-passwordHash')
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize)

    res.json({
      list: userList,
      total: totalCount,
      page: currentPage,
      pages: Math.ceil(totalCount / pageSize)
    })
  } catch (error) {
    next(error)
  }
}

/**
 * 修改用户角色（管理员）
 * 禁止修改自己的角色
 */
async function editUserRole(req, res, next) {
  try {
    const { id } = req.params
    const { role } = req.body

    // 校验角色值有效性
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: '角色值无效' })
    }

    // 禁止操作当前登录用户自身
    if (req.user.userId === id) {
      return res.status(400).json({ message: '不能修改自己的角色' })
    }

    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    ).select('-passwordHash')

    if (!user) {
      return res.status(404).json({ message: '用户不存在' })
    }

    res.json(user)
  } catch (error) {
    next(error)
  }
}

/**
 * 删除用户（管理员）
 * 禁止删除当前登录的自身账号
 */
async function removeUser(req, res, next) {
  try {
    const { id } = req.params

    // 禁止删除自己
    if (req.user.userId === id) {
      return res.status(400).json({ message: '不能删除自己' })
    }

    const user = await User.findByIdAndDelete(id).select('-passwordHash')

    if (!user) {
      return res.status(404).json({ message: '用户不存在' })
    }

    res.json({ message: '删除成功', user })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getUserList,
  editUserRole,
  removeUser
}
