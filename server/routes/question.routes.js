/**
 * 互动问答路由模块
 * 提供问题提交、查询、评论、审核等接口
 * 提问和评论需要登录，审核操作仅限管理员
 */
const express = require('express')
const { body } = require('express-validator')
const questionController = require('../controllers/question.controller')
const verifyToken = require('../middlewares/verifyToken')
const requireAdmin = require('../middlewares/requireAdmin')

const router = express.Router()

// 有效的问题分类枚举值
const validCategories = ['雕刻技艺', '材料处理', '作品鉴赏', '文化传承', '学习交流', '其他']

// 提交问题（需要登录，含表单校验）
router.post(
  '/',
  verifyToken,
  [
    body('content').trim().notEmpty().withMessage('问题内容不能为空').isLength({ max: 500 }).withMessage('内容不超过500字'),
    body('category').trim().notEmpty().withMessage('请选择问题类别').custom((value) => {
      if (!validCategories.includes(value)) {
        throw new Error('无效的问题类别')
      }
      return true
    })
  ],
  questionController.addQuestion
)

// 公开接口：获取已通过审核的问题列表
router.get('/', questionController.getApprovedQuestionList)

// 管理员接口：获取全部问题列表（含待审核）
router.get('/admin', verifyToken, requireAdmin, questionController.getAllQuestionList)

// 公开接口：获取问题详情
router.get('/:id', questionController.getQuestionById)

// 公开接口：获取问题下的评论列表
router.get('/:id/comments', questionController.getCommentList)

// 发表评论（需要登录）
router.post('/:id/comments', verifyToken, questionController.addComment)

// 删除问题（作者或管理员）
router.delete('/:id', verifyToken, questionController.removeQuestion)

// 删除评论（作者或管理员）
router.delete('/:id/comments/:commentId', verifyToken, questionController.removeComment)

// 审核问题（管理员）
router.put('/:id/audit', verifyToken, requireAdmin, questionController.reviewQuestion)

module.exports = router
