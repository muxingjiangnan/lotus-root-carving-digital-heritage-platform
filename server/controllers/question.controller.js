const { validationResult } = require('express-validator');
const Question = require('../models/Question');
const Comment = require('../models/Comment');
const { checkContent } = require('../utils/contentFilter');

exports.createQuestion = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { content, category } = req.body;
    const question = await Question.create({
      content,
      category: category || '其他',
      author: req.user.userId
    });
    res.status(201).json(question);
  } catch (error) {
    next(error);
  }
};

exports.getApprovedQuestions = async (req, res, next) => {
  try {
    const filter = { status: 'approved' };
    if (req.query.category) {
      filter.category = req.query.category;
    }
    const questions = await Question.find(filter)
      .populate('author', 'username')
      .sort({ createdAt: -1 });
    res.json(questions);
  } catch (error) {
    next(error);
  }
};

exports.getAllQuestions = async (req, res, next) => {
  try {
    const questions = await Question.find()
      .populate('author', 'username')
      .sort({ createdAt: -1 });
    res.json(questions);
  } catch (error) {
    next(error);
  }
};

exports.getQuestionDetail = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate('author', 'username');
    if (!question) {
      return res.status(404).json({ message: '问题不存在' });
    }
    if (question.status !== 'approved') {
      return res.status(403).json({ message: '该问题暂未通过审核' });
    }
    res.json(question);
  } catch (error) {
    next(error);
  }
};

exports.getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ question: req.params.id })
      .populate('author', 'username')
      .sort({ createdAt: 1 });
    res.json(comments);
  } catch (error) {
    next(error);
  }
};

exports.createComment = async (req, res, next) => {
  try {
    const { content } = req.body;
    if (!content || !content.trim()) {
      return res.status(400).json({ message: '评论内容不能为空' });
    }
    if (content.length > 500) {
      return res.status(400).json({ message: '评论内容不超过500字' });
    }

    const checkResult = checkContent(content);
    if (!checkResult.pass) {
      return res.status(400).json({ message: checkResult.reason });
    }

    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: '问题不存在' });
    }
    if (question.status !== 'approved') {
      return res.status(400).json({ message: '该问题暂未通过审核，无法评论' });
    }

    const comment = await Comment.create({
      content: content.trim(),
      question: req.params.id,
      author: req.user.userId
    });

    const populatedComment = await Comment.findById(comment._id)
      .populate('author', 'username');

    res.status(201).json(populatedComment);
  } catch (error) {
    next(error);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: '评论不存在' });
    }
    if (comment.question.toString() !== req.params.id) {
      return res.status(400).json({ message: '评论不属于该问题' });
    }
    const isAuthor = comment.author.toString() === req.user.userId;
    const isAdmin = req.user.role === 'admin';
    if (!isAuthor && !isAdmin) {
      return res.status(403).json({ message: '无权删除该评论' });
    }
    await Comment.findByIdAndDelete(req.params.commentId);
    res.json({ message: '删除成功' });
  } catch (error) {
    next(error);
  }
};

exports.deleteQuestion = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: '问题不存在' });
    }
    const isAuthor = question.author.toString() === req.user.userId;
    const isAdmin = req.user.role === 'admin';
    if (!isAuthor && !isAdmin) {
      return res.status(403).json({ message: '无权删除该问题' });
    }
    await Comment.deleteMany({ question: req.params.id });
    await Question.findByIdAndDelete(req.params.id);
    res.json({ message: '删除成功' });
  } catch (error) {
    next(error);
  }
};

exports.auditQuestion = async (req, res, next) => {
  try {
    const { status, answer } = req.body;
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: '无效的审核状态' });
    }

    const question = await Question.findByIdAndUpdate(
      req.params.id,
      { status, answer: answer || '' },
      { new: true }
    ).populate('author', 'username');

    if (!question) {
      return res.status(404).json({ message: '问题不存在' });
    }
    res.json(question);
  } catch (error) {
    next(error);
  }
};
