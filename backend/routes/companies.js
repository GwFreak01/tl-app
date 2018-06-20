const Company = require('../models/company');

const express = require('express');

const router = express.Router();


router.post('', (req, res, next) => {
  console.log(req.body);
  const company = new Company({
    companyName: req.body.companyName,
    companyAddress: {
      street1: req.body.companyAddress.street1,
      street2: req.body.companyAddress.street2,
      city: req.body.companyAddress.city,
      state: req.body.companyAddress.state,
      zipcode: req.body.companyAddress.zipcode,
    },
  });
  // console.log(req.body.companyAddress.street2, company);
  company.save().then((createdCompany) => {
    console.log(createdCompany);
    res.status(201).json({
      message: 'Company added successfully',
      companyId: createdCompany._id
    });
  });
});

router.put('/:id', (req, res, next) => {
  const company = new Company({
    _id: req.params.id,
    companyName: req.body.companyName,
    companyAddress: {
      // _id: req.body.companyAddress.id,
      street1: req.body.companyAddress.street1,
      street2: req.body.companyAddress.street2,
      city: req.body.companyAddress.city,
      state: req.body.companyAddress.state,
      zipcode: req.body.companyAddress.zipcode,
    },
  });
  console.log(company);
  Company.updateOne({_id: req.params.id}, company).then((updatedCompany) => {
    console.log(updatedCompany);
    res.status(200).json({
      message: "Update Successful"
    })
  })
});

router.get('', (req, res, next) => {
  Company.find()
    .then((documents) => {
      // console.log('Server : ' , documents);
      res.status(200).json({
        message: 'Companies fetched successfully!',
        companies: documents
      });
    });
});

router.get('/:id', (req, res, next) => {
  console.log(req.params.id);
  Company.findById(req.params.id).then(company => {
    if (company) {
      console.log("Server.Company: ", company);
      res.status(200).json(
        company)
    } else {
      res.status(404).json({
        message: 'Company not found!'
      })
    }
  });
});

router.delete('/:id', (req, res, next) => {
  // console.log(req.params.id);
  Company.deleteOne({_id: req.params.id}).then((result) => {

    // console.log(result);
    res.status(200).json({
      message: 'Post deleted!'
    })
  });
});

module.exports = router;
