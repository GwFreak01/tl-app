const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.createUser = (req, res, next) => {
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
        error: {
          message: 'Invalid authentication credentials!'
        }
      });
    });

  });
};

exports.loginUser = (req, res, next) => {
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
        process.env.JWT_KEY,
        {
          expiresIn: '1h'
        }
      );
      console.log('Server.login.token: ', token);
      res.status(200).json({
        token: token,
        expiresIn: 3600
      })
    })
    .catch(err => {
      console.log(err)
      return res.status(404).json({
        message: 'Invalid authentication credentials!'
      });
    })
};
