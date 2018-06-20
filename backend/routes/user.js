const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = router;

router.post('/create-user', (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash
    });
    user.save().then(result => {
      res.status(201).json({
        message: 'User Created',
        result: result
      });
    }).catch(err => {
      res.status(500).json({
        error: err
      });
    });

  });
});

router.post('/login', (req, res, next) => {
  User.findOne({email: req.body.email})
    .then(user => {
      if (!user) {
        return res.status(404).json({
          message: 'Auth Failed'
        });
      }
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(404).json({
          message: 'Auth Failed'
        });
      }
      const token = jwt.sign(
        {
          username: user.username,
          userId: user._id
        },
        'dfavhakdjlvahslkda',
        {
          expiresIn: '1h'
        });
    })
    .catch(err => {
      return res.status(404).json({
        message: 'Auth Failed'
      });
    })
});
