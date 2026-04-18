const User = require('../models/User');

exports.getUsers = async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit, 10) || 10, 1);
    const keyword = (req.query.keyword || '').trim();

    const query = {};
    if (keyword) {
      query.username = { $regex: keyword, $options: 'i' };
    }

    const total = await User.countDocuments(query);
    const users = await User.find(query)
      .select('-passwordHash')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      users,
      total,
      page,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    next(error);
  }
};

exports.updateUserRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: '角色值无效' });
    }

    if (req.user.userId === id) {
      return res.status(400).json({ message: '不能修改自己的角色' });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    ).select('-passwordHash');

    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.user.userId === id) {
      return res.status(400).json({ message: '不能删除自己' });
    }

    const user = await User.findByIdAndDelete(id).select('-passwordHash');

    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }

    res.json({ message: '删除成功', user });
  } catch (error) {
    next(error);
  }
};
