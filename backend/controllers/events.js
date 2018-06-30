const Event = require('../models/event');


exports.createEvent = (req, res, next) => {
  // console.log('ReqBody: ', req.body);
  if (req.body.formValues.eventType === 'Quality') {
    const qualityEvent = new Event({
      companyName: req.body.formValues.companyName,
      companyId: req.body.company[0]._id,
      eventType: req.body.formValues.eventType,
      eventDate: req.body.formValues.eventDate,
      tlPartNumber: req.body.formValues.tlPartNumber,
      purchaseOrderNumber: req.body.formValues.purchaseOrderNumber,
      lotNumber: req.body.formValues.lotNumber,
      carNumber: req.body.formValues.carNumber,
      rootCause: req.body.formValues.rootCause,
      quantityReject: req.body.formValues.quantityReject,
      statusOption: 'Open',
    });
    // console.log('qualityEvent: ', qualityEvent);
    qualityEvent.save().then(createdEvent => {
      console.log('Events.save: ', createdEvent);
      return res.status(201).json({
        message: 'Event added successfully',
        event: createdEvent
      });
    })
  } else if (req.body.formValues.eventType === 'Delivery') {
    const deliveryEvent = new Event({
      companyName: req.body.formValues.companyName,
      companyId: req.body.company[0]._id,
      eventType: req.body.formValues.eventType,
      eventDate: req.body.formValues.eventDate,
      tlPartNumber: req.body.formValues.tlPartNumber,
      purchaseOrderNumber: req.body.formValues.purchaseOrderNumber,
      lotNumber: req.body.formValues.lotNumber,
      carNumber: req.body.formValues.carNumber,
      rootCause: req.body.formValues.rootCause,
      requiredDate: req.body.formValues.requiredDate,
      actualDate: req.body.formValues.actualDate,
      statusOption: 'Open'
    });
    // console.log('deliveryEvent: ', deliveryEvent);
    deliveryEvent.save().then(createdEvent => {
      // console.log('Events.save: ', createdEvent);
      return res.status(201).json({
        message: 'Event added successfully',
        event: createdEvent
      });
    })
  }
};

exports.updateEvent = (req, res, next) => {
  // console.log('ServerEventId: ', req.body, req.params.id);
  // console.log('EventId: ', req.params.id);
  Event.updateOne({_id: req.params.id}, req.body).then(updatedCompany => {
    // console.log('UpdatedCompany: ', updatedCompany);
    res.status(200).json({
      message: 'Update Successful'
    })
  });
};

exports.updateEvents = (req, res, next) => {
  // Req.Body = {companyId, companyName}
  // console.log('ServerEventCompanyId: ', req.body);
  // console.log('CompanyId: ', req.body.companyId);
  Event.update({companyId: req.body.companyId}, {companyName: req.body.companyName}, {multi: true},
    function (error, documents) {
      if (error) {
        res.status(500).json({
          message: 'Update events failed!'
        });
      }
      res.status(200).json({
        message: 'Updated events successfully!',
        events: documents
    });
  });
};

exports.getEvents = (req, res, next) => {
  Event.find(function (err, documents) {
    if (err) {
      res.status(500).json({
        message: 'Fetching Companies failed!'
      })
    }
    // console.log('getEvents: ', documents);
    res.status(200).json({
      message: 'Companies fetched successfully!',
      events: documents
    });
  });
};

exports.getAllEvents = (req, res, next) => {
  Event.find()
    .then(documents => {
        // console.log('Documents: ', documents);
        // return documents;
        return res.status(200).json(documents);
      }
    )
};

exports.getCompanyEvents = (req, res, next) => {
  Event.find({companyId: req.body.companyId}, function (error, documents) {
    if (error) {
      return res.status(404).json({
        message: 'Company Events not found!'
      });
    }
    return res.status(200).json({
      message: 'Company Events found!',
      events: documents
    });
  })
};

exports.getEvent = (req, res, next) => {
  console.log(req.params.id);
  Event.findById(req.params.id).then(event => {
    if (event) {
      console.log('Server.Event: ', event);
      return res.status(200).json({
        message: 'Event found!',
        event: event
      });
    } else {
      res.status(400).json({
        message: 'Event not found!'
      })
    }
  });
};

exports.deleteEvent = (req, res, next) => {
  Event.deleteOne({_id: req.params.id})
    .then(result => {
      res.status(200).json({
        message: 'Event deleted!'
      })
    });
};
