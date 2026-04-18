const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const requireAdmin = require('../middlewares/requireAdmin');
const userController = require('../controllers/user.controller');

router.use(verifyToken, requireAdmin);

router.get('/', userController.getUsers);
router.put('/:id/role', userController.updateUserRole);
router.delete('/:id', userController.deleteUser);

module.exports = router;
