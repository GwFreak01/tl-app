const express = require("express");

const app = express();
const bodyParser = require('body-parser');


// app.use((req, res, next) => {
//   console.log("First Middleware");
//   next();
// });
//
// app.use((req, res, next) => {
//   res.send("Hello from Express");
// });

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

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
  const company = req.body;
  console.log(company);
  res.status(201).json({
    message: 'Company added successfully'
  });
});

app.get('/api/companies', (req, res, next) => {
  const companies = [
    {
      _id: 'SMzgR7ptTbKB6d43v',
      companyName: 'T&L',
      companyAddress: {
        street1: '265 Hollenbeck St.',
        city: 'Rochester',
        state: 'NY',
        zipcode: '14621'
      }
    },
    // {
    //   _id: 'SMzgR7ptTbKB6d43v',
    //   companyName: 'Monroe Plating',
    //   companyAddress: {
    //     street1: '265 Hollenbeck St.',
    //     city: 'Rochester',
    //     state: 'NY',
    //     zipcode: '14621'
    //   },
    //   salesPerson: {
    //     name: 'John Rowe',
    //     email: 'jrowe@monroeplating.com',
    //     phone: '585-544-5335',
    //     status: true
    //   },
    //   qualityPerson: {
    //     name: 'Rodney Olson',
    //     email: 'rolson@monroeplating.com',
    //     phone: '585-544-5335',
    //     status: true
    //   },
    //   logisticsPerson: {
    //     name: 'Cindy Poole',
    //     email: 'cpoole@monroeplating.com',
    //     phone: '585-544-5335',
    //     status: true
    //   },
    //   itemDescription: 'Plating Services',
    //   certification: [
    //     {
    //       certType: 'ISO9001',
    //       expirationDate: '2016-09-11T00:00:00.000Z',
    //       certNumber: 'US006178-1',
    //       registrar: 'Bureau Veritas Certification'
    //     }
    //   ],
    //   differentPerson: {
    //     status: false
    //   }
    // },
  ];
  res.status(200).json({
    message: 'Companies fetched successfully!',
    companies: companies
  });
});

module.exports = app;
