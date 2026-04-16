const Artwork = require('../models/Artwork');

exports.getArtworks = async (req, res, next) => {
  try {
    const { category, keyword, page = 1, limit = 12 } = req.query;
    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (keyword) {
      filter.$or = [
        { name: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Artwork.countDocuments(filter);
    const list = await Artwork.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.json({ list, total, page: parseInt(page) });
  } catch (error) {
    next(error);
  }
};

exports.getArtworkById = async (req, res, next) => {
  try {
    const artwork = await Artwork.findById(req.params.id);
    if (!artwork) {
      return res.status(404).json({ message: '作品不存在' });
    }
    res.json(artwork);
  } catch (error) {
    next(error);
  }
};

exports.createArtwork = async (req, res, next) => {
  try {
    const artwork = await Artwork.create(req.body);
    res.status(201).json(artwork);
  } catch (error) {
    next(error);
  }
};

exports.updateArtwork = async (req, res, next) => {
  try {
    const artwork = await Artwork.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!artwork) {
      return res.status(404).json({ message: '作品不存在' });
    }
    res.json(artwork);
  } catch (error) {
    next(error);
  }
};

exports.deleteArtwork = async (req, res, next) => {
  try {
    const artwork = await Artwork.findByIdAndDelete(req.params.id);
    if (!artwork) {
      return res.status(404).json({ message: '作品不存在' });
    }
    res.json({ message: '删除成功' });
  } catch (error) {
    next(error);
  }
};
