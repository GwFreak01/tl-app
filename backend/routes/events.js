const Company = require("../models/company");

const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const checkAuth = require('../middleware/check-auth');

// TODO: Add New Event on API call
router.post('', checkAuth, (req, res, next) => {
  console.log('Server.Events.post: ', req.body);

  if (req.body.event.eventType === 'Quality') {
    console.log(req.body.companyId);
    const qualityEvent = new Event({
      companyName: req.body.event.companyName,
      companyId: req.body.companyId,
      eventType: req.body.event.eventType,
      eventDate: req.body.event.eventDate,
      tlPartNumber: req.body.event.tlPartNumber,
      purchaseOrderNumber: req.body.event.purchaseOrderNumber,
      lotNumber: req.body.event.lotNumber,
      carNumber: req.body.event.carNumber,
      rootCause: req.body.event.rootCause,
      quantityReject: req.body.event.quantityReject,
      statusOption: 'Open',
      // creator:
    });
    qualityEvent.save().then(createdEvent => {
      console.log('Events.save: ', createdEvent);
      return res.status(201).json({
        message: 'Event added successfully',
        eventId: createdEvent._id
      });
    })
  } else if (req.body.event.eventType === 'Delivery') {
    const deliveryEvent = new Event({
      companyName: req.body.event.companyName,
      eventType: req.body.event.eventType,
      eventDate: req.body.event.eventDate,
      tlPartNumber: req.body.event.tlPartNumber,
      purchaseOrderNumber: req.body.event.purchaseOrderNumber,
      lotNumber: req.body.event.lotNumber,
      carNumber: req.body.event.carNumber,
      rootCause: req.body.event.rootCause,
      requiredDate: req.body.event.requiredDate,
      actualDate: req.body.event.actualDate,
      statusOption: 'Open'
    });

    deliveryEvent.save().then(createdEvent => {
      console.log('Events.save: ', createdEvent);
      return res.status(201).json({
        message: 'Event added successfully'
      });
    })
  }
});

router.put('/:id', checkAuth, (req, res, next) => {
  console.log('ServerEventId: ', req.body, req.params.id);
  Event.updateOne({_id: req.params.id}, req.body).then(updatedCompany => {
    console.log(updatedCompany);
    res.status(200).json({
      message: 'Update Successful'
    })
  });
});

router.get('', checkAuth, (req, res, next) => {
  Event.find()
    .then(documents => {
      res.status(200).json({
        message: 'Events fetched successfully',
        events: documents
      });
    });
});

router.get('/:id', checkAuth, (req, res, next) => {
  console.log(req.params.id);
  Event.findById(req.params.id).then(event => {
    if (event) {
      console.log('Server.Event: ', event);
      res.status(200).json(event);
    } else {
      res.status(400).json({
        message: 'Event not found!'
      })
    }
  });
});

router.delete('/:id', checkAuth, (req, res, next) => {
  Event.deleteOne({_id: req.params.id})
    .then(result => {
      res.status(200).json({
        message: 'Event deleted!'
      })
    });
});


module.exports = router;

