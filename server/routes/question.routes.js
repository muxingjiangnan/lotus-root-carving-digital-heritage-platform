const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const questionController = require('../controllers/question.controller');
const verifyToken = require('../middlewares/verifyToken');
const requireAdmin = require('../middlewares/requireAdmin');

const validCategories = ['雕刻技艺', '材料处理', '作品鉴赏', '文化传承', '学习交流', '其他'];

router.post(
  '/',
  verifyToken,
  [
    body('content').trim().notEmpty().withMessage('问题内容不能为空').isLength({ max: 500 }).withMessage('内容不超过500字'),
    body('category').trim().notEmpty().withMessage('请选择问题类别').custom((value) => {
      if (!validCategories.includes(value)) {
        throw new Error('无效的问题类别');
      }
      return true;
    })
  ],
  questionController.createQuestion
);

router.get('/', questionController.getApprovedQuestions);
router.get('/admin', verifyToken, requireAdmin, questionController.getAllQuestions);
router.get('/:id', questionController.getQuestionDetail);
router.get('/:id/comments', questionController.getComments);
router.post('/:id/comments', verifyToken, questionController.createComment);
router.delete('/:id', verifyToken, questionController.deleteQuestion);
router.delete('/:id/comments/:commentId', verifyToken, questionController.deleteComment);
router.put('/:id/audit', verifyToken, requireAdmin, questionController.auditQuestion);

module.exports = router;
