const Artwork = require('../models/Artwork')

/**
 * 获取作品列表（支持分类筛选与关键词搜索）
 */
async function getArtworkList(req, res, next) {
  try {
    const { category, keyword, page = 1, limit = 12 } = req.query
    const queryFilter = {}

    // 按作品分类筛选
    if (category) {
      queryFilter.category = category
    }

    // 按关键词模糊搜索作品名称或描述
    if (keyword) {
      queryFilter.$or = [
        { name: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } }
      ]
    }

    // 计算分页偏移量
    const skipCount = (parseInt(page, 10) - 1) * parseInt(limit, 10)

    // 查询总数与当前页数据
    const totalCount = await Artwork.countDocuments(queryFilter)
    const artworkList = await Artwork.find(queryFilter)
      .sort({ createdAt: -1 })
      .skip(skipCount)
      .limit(parseInt(limit, 10))

    res.json({ list: artworkList, total: totalCount, page: parseInt(page, 10) })
  } catch (error) {
    next(error)
  }
}

/**
 * 根据 ID 获取作品详情
 */
async function getArtworkDetail(req, res, next) {
  try {
    const artwork = await Artwork.findById(req.params.id)
    if (!artwork) {
      return res.status(404).json({ message: '作品不存在' })
    }
    res.json(artwork)
  } catch (error) {
    next(error)
  }
}

/**
 * 新增作品（管理员）
 */
async function addArtwork(req, res, next) {
  try {
    const artwork = await Artwork.create(req.body)
    res.status(201).json(artwork)
  } catch (error) {
    next(error)
  }
}

/**
 * 编辑作品信息（管理员）
 */
async function editArtwork(req, res, next) {
  try {
    const artwork = await Artwork.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    if (!artwork) {
      return res.status(404).json({ message: '作品不存在' })
    }
    res.json(artwork)
  } catch (error) {
    next(error)
  }
}

/**
 * 删除作品（管理员）
 */
async function removeArtwork(req, res, next) {
  try {
    const artwork = await Artwork.findByIdAndDelete(req.params.id)
    if (!artwork) {
      return res.status(404).json({ message: '作品不存在' })
    }
    res.json({ message: '删除成功' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getArtworkList,
  getArtworkDetail,
  addArtwork,
  editArtwork,
  removeArtwork
}
