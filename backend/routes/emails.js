const express = require('express');
const router = express.Router();
const EmailController = require('../controllers/emails');
const checkAuth = require('../middleware/check-auth');


// var dotenv = require('dotenv');
// dotenv.load();
// var account = process.env.EMAIL_ACCOUNT;



router.post('', checkAuth, EmailController.sendEmail);

module.exports = router;

