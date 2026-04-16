const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller');
const verifyToken = require('../middlewares/verifyToken');
const requireAdmin = require('../middlewares/requireAdmin');

router.get('/', courseController.getCourses);
router.get('/:id', courseController.getCourseById);
router.post('/', verifyToken, requireAdmin, courseController.createCourse);
router.put('/:id', verifyToken, requireAdmin, courseController.updateCourse);
router.delete('/:id', verifyToken, requireAdmin, courseController.deleteCourse);

module.exports = router;
