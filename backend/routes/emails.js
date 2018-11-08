const express = require('express');
const router = express.Router();
const EmailController = require('../controllers/emails');
const checkAuth = require('../middleware/check-auth');

router.post('/emailCompanyRegistration', checkAuth, EmailController.sendCompanyRegistration);

router.post('/requestCompanyUpdate', checkAuth, EmailController.sendCompanyUpdate);


router.post('/emailCompany', checkAuth, EmailController.sendEmail);

router.post('/emailAllCompanies', checkAuth, EmailController.sendAllFeedbackEmails);

module.exports = router;

