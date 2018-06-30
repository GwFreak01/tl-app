
const express = require('express');
const router = express.Router();
const EventController = require('../controllers/events');

const checkAuth = require('../middleware/check-auth');


// TODO: Add New Event on API call
router.post('', checkAuth, EventController.createEvent);

router.post('/all', checkAuth, EventController.updateEvents);

router.post('/:id', checkAuth, EventController.updateEvent);



router.get('/getAll', checkAuth, EventController.getAllEvents);

router.get('/companyEvents', checkAuth, EventController.getCompanyEvents);

router.get('/:id', checkAuth, EventController.getEvent);

router.get('', checkAuth, EventController.getEvents);

router.delete('/:id', checkAuth, EventController.deleteEvent);


module.exports = router;

