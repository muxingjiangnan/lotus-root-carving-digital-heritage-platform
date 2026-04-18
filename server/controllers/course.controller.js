const Course = require('../models/Course')

/**
 * 获取课程列表（简化返回，用于列表展示）
 */
async function getCourseList(req, res, next) {
  try {
    const courseDocs = await Course.find().sort({ createdAt: -1 })

    // 提取列表展示所需的字段
    const courseList = courseDocs.map((item) => ({
      _id: item._id,
      title: item.title,
      coverImage: item.coverImage,
      description: item.description,
      chapterCount: item.chapters.length
    }))

    res.json(courseList)
  } catch (error) {
    next(error)
  }
}

/**
 * 根据 ID 获取课程详情
 */
async function getCourseDetail(req, res, next) {
  try {
    const course = await Course.findById(req.params.id)
    if (!course) {
      return res.status(404).json({ message: '课程不存在' })
    }
    res.json(course)
  } catch (error) {
    next(error)
  }
}

/**
 * 新增课程（管理员）
 */
async function addCourse(req, res, next) {
  try {
    const course = await Course.create(req.body)
    res.status(201).json(course)
  } catch (error) {
    next(error)
  }
}

/**
 * 编辑课程信息（管理员）
 */
async function editCourse(req, res, next) {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    if (!course) {
      return res.status(404).json({ message: '课程不存在' })
    }
    res.json(course)
  } catch (error) {
    next(error)
  }
}

/**
 * 删除课程（管理员）
 */
async function removeCourse(req, res, next) {
  try {
    const course = await Course.findByIdAndDelete(req.params.id)
    if (!course) {
      return res.status(404).json({ message: '课程不存在' })
    }
    res.json({ message: '删除成功' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getCourseList,
  getCourseDetail,
  addCourse,
  editCourse,
  removeCourse
}
