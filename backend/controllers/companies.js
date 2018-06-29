const Company = require('../models/company');

exports.createCompany = (req, res, next) => {
  console.log(req.body);
  const company = new Company({
    companyName: req.body.companyName,
    companyAddress: {
      street1: req.body.street1,
      street2: req.body.street2,
      city: req.body.city,
      state: req.body.state,
      zipcode: req.body.zipcode,
    },
    salesPerson: {
      name: req.body.salesName,
      email: req.body.salesEmail,
      phone: req.body.salesPhone,
      status: req.body.salesCheck,
    },
    qualityPerson: {
      name: req.body.qualityName,
      email: req.body.qualityEmail,
      phone: req.body.qualityPhone,
      status: req.body.qualityCheck,
    },
    logisticsPerson: {
      name: req.body.logisticsName,
      email: req.body.logisticsEmail,
      phone: req.body.logisticsPhone,
      status: req.body.logisticsCheck,
    },
    differentPerson: {
      name: req.body.differentName,
      email: req.body.differentEmail,
      phone: req.body.differentPhone,
      status: req.body.differentCheck,
    },
    productDescription: req.body.productDescription,

    certification: {
      certType: req.body.certType,
      expirationDate: req.body.certExpirationDate,
      certNumber: req.body.certNumber,
      registrar: req.body.certRegistrar,
      other: req.body.certTypeOther,
      reason: req.body.certReason,
    },
  });
  // console.log(req.body.companyAddress.street2, company);
  company.save(function (error, company) {
    if (error) {
      return res.status(500).json({
        message: 'Company creation failed!'
      });
    }
    console.log('createdCompany: ', company);
    return res.status(201).json({
      message: 'Company added successfully',
      companyObject: company
    });
  });
};

exports.updateCompany = (req, res, next) => {
  // console.log(req.body);
  const company = {
    companyName: req.body.companyName,
    companyAddress: {
      street1: req.body.street1,
      street2: req.body.street2,
      city: req.body.city,
      state: req.body.state,
      zipcode: req.body.zipcode,
    },
    salesPerson: {
      name: req.body.salesName,
      email: req.body.salesEmail,
      phone: req.body.salesPhone,
      status: req.body.salesCheck,
    },
    qualityPerson: {
      name: req.body.qualityName,
      email: req.body.qualityEmail,
      phone: req.body.qualityPhone,
      status: req.body.qualityCheck,
    },
    logisticsPerson: {
      name: req.body.logisticsName,
      email: req.body.logisticsEmail,
      phone: req.body.logisticsPhone,
      status: req.body.logisticsCheck,
    },
    differentPerson: {
      name: req.body.differentName,
      email: req.body.differentEmail,
      phone: req.body.differentPhone,
      status: req.body.differentCheck,
    },
    productDescription: req.body.productDescription,

    certification: {
      certType: req.body.certType,
      expirationDate: req.body.certExpirationDate,
      certNumber: req.body.certNumber,
      registrar: req.body.certRegistrar,
      other: req.body.certTypeOther,
      reason: req.body.certReason,
    },
  };

  Company.findByIdAndUpdate({_id: req.params.id}, company,
    function (error, document) {
      if (error) {
        return res.status(500).json({
          message: 'Update Company failed!'
        });
      }
      return res.status(200).json({
        message: "Update Successful",
        company: document
      })
    });
};

exports.getCompanies = (req, res, next) => {
  Company.find(function (err, documents) {
    if (err) {
      res.status(500).json({
        message: 'Fetching Companies failed!'
      })
    }
    res.status(200).json({
      message: 'Companies fetched successfully!',
      companies: documents
    });
  })
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
  Company.deleteOne({_id: req.params.id})
    .then((result) => {
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
