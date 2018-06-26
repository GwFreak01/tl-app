const Event = require('../models/event');


exports.createEvent = (req, res, next) => {
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
      companyId: req.body.companyId,
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
};

exports.updateEvent = (req, res, next) => {
  console.log('ServerEventId: ', req.body, req.params.id);
  Event.updateOne({_id: req.params.id}, req.body).then(updatedCompany => {
    console.log(updatedCompany);
    res.status(200).json({
      message: 'Update Successful'
    })
  });
};

exports.updateEvents = (req, res, next) => {
  // Req.Body = {companyId, companyName}
  console.log('ServerEventCompanyId: ', req.body);
  // const effectedEvents = [];
  const updatedEvents = [];
  Event.updateMany({companyId: req.body.companyId}, {companyName: req.body.companyName}, function (err, response) {
    if (err) {
      res.status(500).json({
        message: 'Update events failed!'
      });
      console.log('UpdateManyRes: ', response);
      res.status(200).json({
        message: 'Updated events successfully'
      });
    }
  });
  // Event.find({companyId: req.body.companyId}).then(events => {
  //   console.log('EffectedEvents: ', events, events.length);
  //   this.effectedEvents = events;
  //
  //   for (let i = 0; i < this.effectedEvents.length; i++) {
  //     Event.findByIdAndUpdate({companyId: this.effectedEvents[i].companyId}, {companyName: req.body.companyName}, {
  //       new: true,
  //       multi: true
  //     }, function (err, model) {
  //       if (err) {
  //         res.status(400).json({
  //           message: 'Update Failed'
  //         })
  //       }
  //       console.log(model);
  //
  //     });
  //
  //   }

  // console.log('UpdatedEvents: ', updatedEvents);

  // });


};

exports.getEvents = (req, res, next) => {
  Event.find()
    .then(documents => {
      res.status(200).json({
        message: 'Events fetched successfully',
        events: documents
      });
    });
};

exports.getEvent = (req, res, next) => {
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
};

exports.deleteEvent = (req, res, next) => {
  Event.deleteOne({_id: req.params.id})
    .then(result => {
      res.status(200).json({
        message: 'Event deleted!'
      })
    });
};
