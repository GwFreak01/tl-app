const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const checkAuth = require('../middleware/check-auth');

// TODO: Add New Event on API call
router.post('', checkAuth, (req, res, next) => {
  console.log('Server.Events.post: ', req.body);
  if (req.body.eventType === 'Quality') {
    const qualityEvent = new Event({
      companyName: req.body.companyName,
      eventType: req.body.eventType,
      eventDate: req.body.eventDate,
      tlPartNumber: req.body.tlPartNumber,
      purchaseOrderNumber: req.body.purchaseOrderNumber,
      lotNumber: req.body.lotNumber,
      carNumber: req.body.carNumber,
      rootCause: req.body.rootCause,
      quantityReject: req.body.quantityReject,
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
  } else if (req.body.eventType === 'Delivery') {
    const deliveryEvent = new Event({
      companyName: req.body.companyName,
      eventType: req.body.eventType,
      eventDate: req.body.eventDate,
      tlPartNumber: req.body.tlPartNumber,
      purchaseOrderNumber: req.body.purchaseOrderNumber,
      lotNumber: req.body.lotNumber,
      carNumber: req.body.carNumber,
      rootCause: req.body.rootCause,
      requiredDate: req.body.requiredDate,
      actualDate: req.body.actualDate,
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

