/**
 * 作品管理路由模块
 * 提供作品列表查询、详情查看、创建、更新、删除等接口
 * GET 接口公开访问，写操作需要管理员权限
 */
const express = require('express')
const artworkController = require('../controllers/artwork.controller')
const verifyToken = require('../middlewares/verifyToken')
const requireAdmin = require('../middlewares/requireAdmin')

const router = express.Router()

// 公开接口：获取作品列表（支持分类筛选和关键词搜索）
router.get('/', artworkController.getArtworkList)

// 公开接口：获取作品详情
router.get('/:id', artworkController.getArtworkDetail)

// 管理员接口：新增作品
router.post('/', verifyToken, requireAdmin, artworkController.addArtwork)

// 管理员接口：编辑作品
router.put('/:id', verifyToken, requireAdmin, artworkController.editArtwork)

// 管理员接口：删除作品
router.delete('/:id', verifyToken, requireAdmin, artworkController.removeArtwork)

module.exports = router
