const express = require('express');
const router = express.Router();
const exhibitionController = require('../controllers/exhibition.controller');
const verifyToken = require('../middlewares/verifyToken');
const requireAdmin = require('../middlewares/requireAdmin');

router.get('/', exhibitionController.getExhibition);
router.put('/', verifyToken, requireAdmin, exhibitionController.updateExhibition);

module.exports = router;
