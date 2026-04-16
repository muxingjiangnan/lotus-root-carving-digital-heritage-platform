const express = require('express');
const router = express.Router();
const artworkController = require('../controllers/artwork.controller');
const verifyToken = require('../middlewares/verifyToken');
const requireAdmin = require('../middlewares/requireAdmin');

router.get('/', artworkController.getArtworks);
router.get('/:id', artworkController.getArtworkById);
router.post('/', verifyToken, requireAdmin, artworkController.createArtwork);
router.put('/:id', verifyToken, requireAdmin, artworkController.updateArtwork);
router.delete('/:id', verifyToken, requireAdmin, artworkController.deleteArtwork);

module.exports = router;
