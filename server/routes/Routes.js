//route paths
const express = require('express');
const router = express.Router();

const handlerController = require('../controllers/HandlerCredentialsController');
const { handleRegisterDirector, handleLoginDirector } = require('../controllers/DirectorController');
const handlerLoginController = require('../controllers/HandlerLoginController');
// Route to register a director
router.post('/register', handleRegisterDirector);

// Route to login a director
router.post('/login', handleLoginDirector);

// Route to get all handlers
router.get('/handler', handlerController.getAllHandlers);
// Route to add a handler
router.post('/handler', handlerController.addHandler);
// Route to login a handler
router.post('/handlerlogin', handlerLoginController.handleLoginHandler);

module.exports = router;
