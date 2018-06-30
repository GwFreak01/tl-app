const express = require('express');
const router = express.Router();
const CompanyController = require('../controllers/companies');
const checkAuth = require('../middleware/check-auth');


router.put('', checkAuth, CompanyController.createCompany);

router.post('/:id', checkAuth, CompanyController.updateCompany);


router.get('/:id', checkAuth, CompanyController.getCompany);

router.get('', checkAuth, CompanyController.getCompanies);

router.delete('/:id', checkAuth, CompanyController.deleteCompany);

module.exports = router;
