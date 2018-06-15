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


  console.log(req.body.companyAddress.street2, company);
  company.save();
  res.status(201).json({
    message: 'Company added successfully'
  });
});

app.get('/api/companies', (req, res, next) => {
  // const companies = [
  //   {
  //     _id: 'SMzgR7ptTbKB6d43v',
  //     companyName: 'T&L',
  //     companyAddress: {
  //       street1: '265 Hollenbeck St.',
  //       city: 'Rochester',
  //       state: 'NY',
  //       zipcode: '14621'
  //     }
  //   },
  //   // {
  //   //   _id: 'SMzgR7ptTbKB6d43v',
  //   //   companyName: 'Monroe Plating',
  //   //   companyAddress: {
  //   //     street1: '265 Hollenbeck St.',
  //   //     city: 'Rochester',
  //   //     state: 'NY',
  //   //     zipcode: '14621'
  //   //   },
  //   //   salesPerson: {
  //   //     name: 'John Rowe',
  //   //     email: 'jrowe@monroeplating.com',
  //   //     phone: '585-544-5335',
  //   //     status: true
  //   //   },
  //   //   qualityPerson: {
  //   //     name: 'Rodney Olson',
  //   //     email: 'rolson@monroeplating.com',
  //   //     phone: '585-544-5335',
  //   //     status: true
  //   //   },
  //   //   logisticsPerson: {
  //   //     name: 'Cindy Poole',
  //   //     email: 'cpoole@monroeplating.com',
  //   //     phone: '585-544-5335',
  //   //     status: true
  //   //   },
  //   //   itemDescription: 'Plating Services',
  //   //   certification: [
  //   //     {
  //   //       certType: 'ISO9001',
  //   //       expirationDate: '2016-09-11T00:00:00.000Z',
  //   //       certNumber: 'US006178-1',
  //   //       registrar: 'Bureau Veritas Certification'
  //   //     }
  //   //   ],
  //   //   differentPerson: {
  //   //     status: false
  //   //   }
  //   // },
  // ];
  Company.find()
    .then(documents => {
      console.log('Server : ' , documents);
      res.status(200).json({
        message: 'Companies fetched successfully!',
        companies: documents
      });
    });

});

module.exports = app;
