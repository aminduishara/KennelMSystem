const express = require('express');
const router = express.Router();
const handlerController = require('../controllers/HandlerController');
const { handleRegisterDirector, handleLoginDirector } = require('../controllers/DirectorController');

router.get('/handler', handlerController.getAllHandlers);
router.post('/handler', handlerController.addHandler);

// Route to register a director
router.post('/register', handleRegisterDirector);

// Route to login a director
router.post('/login', handleLoginDirector);

module.exports = router;
