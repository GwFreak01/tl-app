const mongoose = require('mongoose');


const uniqueValidator = require('mongoose-unique-validator');

const eventSchema = mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  eventDate: {
    type: Date,
    required: true,
  },
  eventType: {
    type: String,
    required: true,
  },
  tlPartNumber: {
    type: String,
    required: true,
  },
  purchaseOrderNumber: {
    type: String,
    required: true,
  },
  lotNumber: {
    type: String,
    required: true,
  },
  carNumber: {
    type: String,
    required: true,
  },
  quantityReject: {
    type: Number,
  },
  requiredDate: {
    type: Date,
  },
  actualDate: {
    type: Date,
  },
  rootCause: {
    type: String,
    required: true,
  },
  statusOption: {
    type: String,
    required: true,
  }
});

eventSchema.set('autoIndex', false);

eventSchema.plugin(uniqueValidator);


module.exports = mongoose.model('Event', eventSchema);
