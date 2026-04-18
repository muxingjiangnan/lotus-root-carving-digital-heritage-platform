/**
 * 非遗展厅路由模块
 * 提供展厅信息查询与更新接口
 * GET 公开访问，PUT 需要管理员权限
 */
const express = require('express')
const exhibitionController = require('../controllers/exhibition.controller')
const verifyToken = require('../middlewares/verifyToken')
const requireAdmin = require('../middlewares/requireAdmin')

const router = express.Router()

// 公开接口：获取展厅信息
router.get('/', exhibitionController.getExhibitionInfo)

// 管理员接口：更新展厅信息
router.put('/', verifyToken, requireAdmin, exhibitionController.editExhibition)

module.exports = router
