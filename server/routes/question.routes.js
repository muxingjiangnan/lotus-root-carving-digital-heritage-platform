const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const questionController = require('../controllers/question.controller');
const verifyToken = require('../middlewares/verifyToken');
const requireAdmin = require('../middlewares/requireAdmin');

router.post(
  '/',
  verifyToken,
  [body('content').trim().notEmpty().withMessage('问题内容不能为空').isLength({ max: 500 }).withMessage('内容不超过500字')],
  questionController.createQuestion
);

router.get('/', questionController.getApprovedQuestions);
router.get('/admin', verifyToken, requireAdmin, questionController.getAllQuestions);
router.put('/:id/audit', verifyToken, requireAdmin, questionController.auditQuestion);

module.exports = router;
