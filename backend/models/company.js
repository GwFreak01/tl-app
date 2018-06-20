const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const companyAddress = mongoose.Schema({
  street1: {
    type: String,
    required: true,
  },
  street2: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipcode: {
    type: String,
    required: true,
  }
});

const salesPerson = mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  status: Boolean,

});

const qualityPerson = mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  status: Boolean,
});

const logisticsPerson = mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  status: Boolean,
});

const differentPerson = mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  status: Boolean,
});

// TODO: Verify certification schema is ideal/valid
const certification = mongoose.Schema({
  certType: String,
  expirationDate: String,
  certNumber: String,
  registrar: String,
  other: String,
  reason: String,
});
// TODO: Validate unique companies
const companySchema = mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    unique: true,
  },
  companyAddress: {
    type: companyAddress
  },
  salesPerson: {
    type: salesPerson
  },
  qualityPerson: {
    type: qualityPerson
  },
  logisticsPerson: {
    type: logisticsPerson
  },
  differentPerson: {
    type: differentPerson
  },
  productDescription: {
    type: String,
    required: true,
  },
  certification: {
    type: certification,
    required: true
  }
});
// companySchema.set('autoIndex', false);
//
// companySchema.plugin(uniqueValidator());

module.exports = mongoose.model('Company', companySchema);
