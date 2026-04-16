const { validationResult } = require('express-validator');
const Question = require('../models/Question');

exports.createQuestion = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { content } = req.body;
    const question = await Question.create({
      content,
      author: req.user.userId
    });
    res.status(201).json(question);
  } catch (error) {
    next(error);
  }
};

exports.getApprovedQuestions = async (req, res, next) => {
  try {
    const questions = await Question.find({ status: 'approved' })
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
