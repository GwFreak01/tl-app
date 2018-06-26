
const express = require('express');
const router = express.Router();
const EventController = require('../controllers/events');

const checkAuth = require('../middleware/check-auth');


// TODO: Add New Event on API call
router.post('', checkAuth, EventController.createEvent);

router.put('/:id', checkAuth, EventController.updateEvent);

router.put('', checkAuth, EventController.updateEvents);

router.get('', checkAuth, EventController.getEvents);

router.get('/:id', checkAuth, EventController.getEvent);

router.delete('/:id', checkAuth, EventController.deleteEvent);


module.exports = router;

