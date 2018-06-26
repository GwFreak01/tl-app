const express = require('express');
const UserController = require('../controllers/user');

const router = express.Router();

router.post('/create-user', UserController.createUser);

router.post('/login', UserController.loginUser);


module.exports = router;
