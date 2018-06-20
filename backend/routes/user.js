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
  let fetchedUser;
  console.log(req.body.email);
  User.findOne({email: req.body.email})
    .then(user => {
      console.log('Server.User.login: ', user);
      if (!user) {
        return res.status(404).json({
          message: 'Auth Failed'
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      console.log('Server.login.result', result);
      if (!result) {
        return res.status(404).json({
          message: 'Auth Failed'
        });
      }
      const token = jwt.sign(
        {
          username: fetchedUser.username,
          email: fetchedUser.email,
          userId: fetchedUser._id
        },
        'dfavhakdjlvahslkda',
        {
          expiresIn: '1h'
        }
      );
      console.log('Server.login.token: ', token);
      res.status(200).json({
        token: token
      })
    })
    .catch(err => {
      console.log(err)
      return res.status(404).json({
        message: 'Auth Failed'
      });
    })
});
