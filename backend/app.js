const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Company = require('./models/company');
const app = express();

mongoose.connect("mongodb+srv://gwfreak01:NfMTyV0Bg4rdaXm8@cluster0-s32lv.mongodb.net/tl-sms?retryWrites=true")
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS");
  // res.header()

  next();
});

app.post("/api/companies", (req, res, next) => {
  // console.log(req.body);
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

app.put('/api/companies/:id', (req, res, next) => {
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

app.get('/api/companies', (req, res, next) => {
  Company.find()
    .then((documents) => {
      // console.log('Server : ' , documents);
      res.status(200).json({
        message: 'Companies fetched successfully!',
        companies: documents
      });
    });
});

app.get('/api/companies/:id', (req, res, next) => {
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

app.delete('/api/companies/:id', (req, res, next) => {
  // console.log(req.params.id);
  Company.deleteOne({_id: req.params.id}).then((result) => {

    // console.log(result);
    res.status(200).json({
      message: 'Post deleted!'
    })
  });

});

module.exports = app;
