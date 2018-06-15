const mongoose = require('mongoose');

const companyAddress = mongoose.Schema({
  street1: {
    type: String,
    // required: true,
  },
  street2: {
    type: String,
  },
  city: {
    type: String,
    // required: true,
  },
  state: {
    type: String,
    // required: true,
  },
  zipcode: {
    type: String,
    // required: true,
  }
});

const companySchema = mongoose.Schema({
  companyName: {
    type: String,
  },
  companyAddress: {
    type: companyAddress

    // unique: true,
    // index: true,
    // required: true,
  },

  // salesPerson: {
  //   name: {
  //     type: String,
  //
  //   },
  //   email: {
  //     type: String,
  //   },
  //   phone: {
  //     type: String,
  //   }
  // }
});

module.exports = mongoose.model('Company', companySchema);
