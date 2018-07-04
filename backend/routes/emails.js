const express = require('express');
const router = express.Router();
const EmailController = require('../controllers/emails');
const checkAuth = require('../middleware/check-auth');

router.post('/emailCompanyRegistration', checkAuth, EmailController.sendCompanyRegistration);

router.post('/emailCompany', checkAuth, EmailController.sendEmail);

module.exports = router;

