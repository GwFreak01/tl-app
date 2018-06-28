const Company = require('../models/company');

exports.createCompany = (req, res, next) => {
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
    salesPerson: {
      name: req.body.salesPerson.name,
      email: req.body.salesPerson.email,
      phone: req.body.salesPerson.phone,
      status: req.body.salesPerson.status,
    },
    qualityPerson: {
      name: req.body.qualityPerson.name,
      email: req.body.qualityPerson.email,
      phone: req.body.qualityPerson.phone,
      status: req.body.qualityPerson.status,
    },
    logisticsPerson: {
      name: req.body.logisticsPerson.name,
      email: req.body.logisticsPerson.email,
      phone: req.body.logisticsPerson.phone,
      status: req.body.logisticsPerson.status,
    },
    differentPerson: {
      name: req.body.differentPerson.name,
      email: req.body.differentPerson.email,
      phone: req.body.differentPerson.phone,
      status: req.body.differentPerson.status,
    },
    productDescription: req.body.productDescription,

    certification: {
      certType: req.body.certification.certType,
      expirationDate: req.body.certification.expirationDate,
      certNumber: req.body.certification.certNumber,
      registrar: req.body.certification.registrar,
      other: req.body.certification.other,
      reason: req.body.certification.reason,
    },
  });
  // console.log(req.body.companyAddress.street2, company);
  company.save(function (error, company) {
    if (error) {
      res.status(500).json({
        message: 'Company creation failed!'
      });
    }
    console.log('createdCompany: ', company);
    res.status(201).json({
      message: 'Company added successfully',
      companyObject: company
    });
  });
};

exports.updateCompany = (req, res, next) => {
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

  // const const
  console.log(company);
  Company.updateOne({_id: req.params.id}, company)
    .then(updatedCompany => {
      // console.log(updatedCompany);
      res.status(200).json({
        message: "Update Successful"
      })
    })
    .catch(error => {
      res.status(500).json({
        message: 'Update Company failed!'
      })
    });
};

exports.getCompanies = (req, res, next) => {
  Company.find()
    .then((documents) => {
      // console.log('Server : ' , documents);
      res.status(200).json({
        message: 'Companies fetched successfully!',
        companies: documents
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Fetching Companies failed!'
      })
    });
};

exports.getCompany = (req, res, next) => {
  Company.findById(req.params.id, function (err, document) {
    if (err) {
      return res.status(404).json({
        message: 'Find company failed!'
      });
    } else {
      const company = {
        id: document._id,
        companyName: document.companyName,
        companyAddress: {
          id: document.companyAddress._id,
          street1: document.companyAddress.street1,
          street2: document.companyAddress.street2,
          city: document.companyAddress.city,
          state: document.companyAddress.state,
          zipcode: document.companyAddress.zipcode
        },
        salesPerson: {
          id: document.salesPerson._id,
          name: document.salesPerson.name,
          email: document.salesPerson.email,
          phone: document.salesPerson.phone,
          status: document.salesPerson.status
        },
        qualityPerson: {
          id: document.qualityPerson._id,
          name: document.qualityPerson.name,
          email: document.qualityPerson.email,
          phone: document.qualityPerson.phone,
          status: document.qualityPerson.status
        },
        logisticsPerson: {
          id: document.logisticsPerson._id,
          name: document.logisticsPerson.name,
          email: document.logisticsPerson.email,
          phone: document.logisticsPerson.phone,
          status: document.logisticsPerson.status
        },
        differentPerson: {
          id: document.differentPerson._id,
          name: document.differentPerson.name,
          email: document.differentPerson.email,
          phone: document.differentPerson.phone,
          status: document.differentPerson.status
        },
        productDescription: document.productDescription,

        certification: {
          id: document.certification._id,
          certType: document.certification.certType,
          expirationDate: document.certification.expirationDate,
          certNumber: document.certification.certNumber,
          registrar: document.certification.registrar,
          other: document.certification.other,
          reason: document.certification.reason
        },
      };

      return res.status(200).json({
        message: 'Find company successful!',
        company: company
      });
    }
  });
};

exports.deleteCompany = (req, res, next) => {
  // console.log(req.params.id);
  Company.deleteOne({_id: req.params.id})
    .then((result) => {
      // console.log(result);
      res.status(200).json({
        message: 'Company deleted!'
      })
    })
    .catch(error => {
      res.status(500).json({
        message: 'Delete Company failed!'
      });
    });
};
