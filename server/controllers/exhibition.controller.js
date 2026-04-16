const Exhibition = require('../models/Exhibition');

exports.getExhibition = async (req, res, next) => {
  try {
    let exhibition = await Exhibition.findOne();
    if (!exhibition) {
      exhibition = await Exhibition.create({
        title: '莲花根雕非遗文化展厅',
        sections: []
      });
    }
    res.json(exhibition);
  } catch (error) {
    next(error);
  }
};

exports.updateExhibition = async (req, res, next) => {
  try {
    const { title, sections } = req.body;
    let exhibition = await Exhibition.findOne();
    if (!exhibition) {
      exhibition = await Exhibition.create({ title, sections });
    } else {
      exhibition.title = title || exhibition.title;
      exhibition.sections = sections || exhibition.sections;
      exhibition.updatedAt = Date.now();
      await exhibition.save();
    }
    res.json(exhibition);
  } catch (error) {
    next(error);
  }
};
