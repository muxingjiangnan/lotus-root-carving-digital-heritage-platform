const { validationResult } = require('express-validator')
const Question = require('../models/Question')
const Comment = require('../models/Comment')
const { checkContent } = require('../utils/contentFilter')

/**
 * 提交问题（需要登录）
 * 提交后进入待审核状态，管理员审核通过后方可展示
 */
async function addQuestion(req, res, next) {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg })
    }

    const { content, category } = req.body
    const question = await Question.create({
      content,
      category: category || '其他',
      author: req.user.userId
    })

    res.status(201).json(question)
  } catch (error) {
    next(error)
  }
}

/**
 * 获取已通过审核的问题列表（前台展示）
 * 支持按问题分类筛选
 */
async function getApprovedQuestionList(req, res, next) {
  try {
    const queryFilter = { status: 'approved' }
    if (req.query.category) {
      queryFilter.category = req.query.category
    }

    const questionList = await Question.find(queryFilter)
      .populate('author', 'username')
      .sort({ createdAt: -1 })

    res.json(questionList)
  } catch (error) {
    next(error)
  }
}

/**
 * 获取全部问题列表（管理员后台审核用）
 */
async function getAllQuestionList(req, res, next) {
  try {
    const questionList = await Question.find()
      .populate('author', 'username')
      .sort({ createdAt: -1 })

    res.json(questionList)
  } catch (error) {
    next(error)
  }
}

/**
 * 根据 ID 获取问题详情（仅已审核状态可查看）
 */
async function getQuestionById(req, res, next) {
  try {
    const question = await Question.findById(req.params.id)
      .populate('author', 'username')

    if (!question) {
      return res.status(404).json({ message: '问题不存在' })
    }
    if (question.status !== 'approved') {
      return res.status(403).json({ message: '该问题暂未通过审核' })
    }

    res.json(question)
  } catch (error) {
    next(error)
  }
}

/**
 * 获取指定问题下的评论列表（按时间正序）
 */
async function getCommentList(req, res, next) {
  try {
    const commentList = await Comment.find({ question: req.params.id })
      .populate('author', 'username')
      .sort({ createdAt: 1 })

    res.json(commentList)
  } catch (error) {
    next(error)
  }
}

/**
 * 发表评论（需要登录）
 * 发表前进行内容审核，检查违禁词与联系方式
 */
async function addComment(req, res, next) {
  try {
    const { content } = req.body

    // 校验评论内容非空
    if (!content || !content.trim()) {
      return res.status(400).json({ message: '评论内容不能为空' })
    }

    // 校验评论长度不超过 500 字
    if (content.length > 500) {
      return res.status(400).json({ message: '评论内容不超过500字' })
    }

    // 调用内容审核工具检查违禁词和联系方式
    const auditResult = checkContent(content)
    if (!auditResult.pass) {
      return res.status(400).json({ message: auditResult.reason })
    }

    // 校验所属问题是否存在且已审核
    const question = await Question.findById(req.params.id)
    if (!question) {
      return res.status(404).json({ message: '问题不存在' })
    }
    if (question.status !== 'approved') {
      return res.status(400).json({ message: '该问题暂未通过审核，无法评论' })
    }

    // 创建评论并填充作者信息
    const comment = await Comment.create({
      content: content.trim(),
      question: req.params.id,
      author: req.user.userId
    })

    const populatedComment = await Comment.findById(comment._id)
      .populate('author', 'username')

    res.status(201).json(populatedComment)
  } catch (error) {
    next(error)
  }
}

/**
 * 删除评论
 * 仅评论作者或管理员有权删除
 */
async function removeComment(req, res, next) {
  try {
    const comment = await Comment.findById(req.params.commentId)
    if (!comment) {
      return res.status(404).json({ message: '评论不存在' })
    }

    // 校验评论是否属于当前问题
    if (comment.question.toString() !== req.params.id) {
      return res.status(400).json({ message: '评论不属于该问题' })
    }

    // 权限校验：仅作者或管理员可删除
    const isAuthor = comment.author.toString() === req.user.userId
    const isAdmin = req.user.role === 'admin'
    if (!isAuthor && !isAdmin) {
      return res.status(403).json({ message: '无权删除该评论' })
    }

    await Comment.findByIdAndDelete(req.params.commentId)
    res.json({ message: '删除成功' })
  } catch (error) {
    next(error)
  }
}

/**
 * 删除问题（连带删除该问题下的所有评论）
 * 仅问题作者或管理员有权删除
 */
async function removeQuestion(req, res, next) {
  try {
    const question = await Question.findById(req.params.id)
    if (!question) {
      return res.status(404).json({ message: '问题不存在' })
    }

    // 权限校验：仅作者或管理员可删除
    const isAuthor = question.author.toString() === req.user.userId
    const isAdmin = req.user.role === 'admin'
    if (!isAuthor && !isAdmin) {
      return res.status(403).json({ message: '无权删除该问题' })
    }

    // 级联删除该问题下的所有评论
    await Comment.deleteMany({ question: req.params.id })
    await Question.findByIdAndDelete(req.params.id)

    res.json({ message: '删除成功' })
  } catch (error) {
    next(error)
  }
}

/**
 * 审核问题（管理员）
 * 支持通过或拒绝，并可附官方回复
 */
async function reviewQuestion(req, res, next) {
  try {
    const { status, answer } = req.body

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: '无效的审核状态' })
    }

    const question = await Question.findByIdAndUpdate(
      req.params.id,
      { status, answer: answer || '' },
      { new: true }
    ).populate('author', 'username')

    if (!question) {
      return res.status(404).json({ message: '问题不存在' })
    }

    res.json(question)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  addQuestion,
  getApprovedQuestionList,
  getAllQuestionList,
  getQuestionById,
  getCommentList,
  addComment,
  removeComment,
  removeQuestion,
  reviewQuestion
}
