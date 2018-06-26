const express = require('express');
const UserController = require('../controllers/user');

const router = express.Router();
module.exports = router;

router.post('/create-user', UserController.userCreate);

router.post('/login', UserController.userLogin);
