const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.registerDirector);
router.post('/login', authController.loginDirector);

module.exports = router;
