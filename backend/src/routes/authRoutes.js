const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers.js');
const { protect } = require('../middleware/authMiddleware.js');

// routes
router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/logout', authController.logout);
router.get('/me', protect, authController.getMe);

module.exports = router;