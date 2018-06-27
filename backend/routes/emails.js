const express = require('express');
const router = express.Router();
const EmailController = require('../controllers/emails');
const checkAuth = require('../middleware/check-auth');


router.post('', checkAuth, EmailController.sendEmail);

module.exports = router;

