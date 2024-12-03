const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware'); // Import middleware

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/:id', authMiddleware.verifyToken, authController.getUserDetails); // Add this line

module.exports = router;
