//route paths
const express = require('express');
const router = express.Router();

const handlerController = require('../controllers/HandlerCredentialsController');
const { handleRegisterDirector, handleLoginDirector, handleRemoveUser, handleUpdateUser, handleGetUser, handleGetSingleUser } = require('../controllers/DirectorController');
const handlerLoginController = require('../controllers/HandlerLoginController');
//importing the handlerDetailsAutoFillingController
const handlerDetailsAutoFillingController = require('../controllers/HandlerDetailsAutoFillingController');

// Route to register a director
router.post('/register', handleRegisterDirector);
router.post('/removeUser', handleRemoveUser);
router.post('/updateUser', handleUpdateUser);
router.get('/getUsers/?', handleGetUser);
router.get('/getUser/?', handleGetSingleUser);

// Route to login a director
router.post('/login', handleLoginDirector);

// Route to get all handlers
router.get('/handler', handlerController.getAllHandlers);
// Route to add a handler
router.post('/handler', handlerController.addHandler);
// Route to login a handler
router.post('/handlerlogin', handlerLoginController.handleLoginHandler);
// Route to get handler details by username
router.get('/handlerdetails', handlerDetailsAutoFillingController.handleGetHandlerDetails);


module.exports = router;
