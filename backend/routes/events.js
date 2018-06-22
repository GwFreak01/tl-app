const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const checkAuth = require('../middleware/check-auth');

// TODO: Add New Event on API call
router.post('', checkAuth, (req, res, next) => {
  console.log('Server.Events.post: ', req.body);

  res.status(201).json({
    message: 'Event added successfully'
  });

});




module.exports = router;

