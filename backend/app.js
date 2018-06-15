const express = require('express');

const app = express();

// app.use((req, res, next) => {
//   console.log("First Middleware");
//   next();
// });
//
// app.use((req, res, next) => {
//   res.send("Hello from Express");
// });

app.use('/api/companies', (req, res, next) => {
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
    {
      _id: 'SMzgR7ptTbKB6d43v',
      companyName: 'Monroe Plating',
      companyAddress: {
        street1: '265 Hollenbeck St.',
        city: 'Rochester',
        state: 'NY',
        zipcode: '14621'
      },
      salesPerson: {
        name: 'John Rowe',
        email: 'jrowe@monroeplating.com',
        phone: '585-544-5335',
        status: true
      },
      qualityPerson: {
        name: 'Rodney Olson',
        email: 'rolson@monroeplating.com',
        phone: '585-544-5335',
        status: true
      },
      logisticsPerson: {
        name: 'Cindy Poole',
        email: 'cpoole@monroeplating.com',
        phone: '585-544-5335',
        status: true
      },
      itemDescription: 'Plating Services',
      certification: [
        {
          certType: 'ISO9001',
          expirationDate: '2016-09-11T00:00:00.000Z',
          certNumber: 'US006178-1',
          registrar: 'Bureau Veritas Certification'
        }
      ],
      differentPerson: {
        status: false
      }
    },
  ];
  res.status(200).json({
    message: 'Companies fetched successfully!',
    companies: companies
  });
});

module.exports = app;
