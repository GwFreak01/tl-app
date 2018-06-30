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
      console.log(err.message);
      res.status(500).json({
        message: err.message
      });
    });

  });
};

exports.loginUser = (req, res, next) => {
  let fetchedUser;
  if (req.body.username === 'tl_admin') {
    User.findOne({$or: [{username: req.body.username}, {email: req.body.email}]}, function (error, user) {
      if (!user) {
        console.log(user);
        bcrypt.hash(req.body.password, 10).then(hash => {
          const user = new User({
            username: req.body.username,
            email: 'tl_admin@tl.com',
            password: hash
          });
          user.save().then(result => {
            console.log(result);
            // res.status(201).json({
            //   message: 'User Created',
            //   result: result
            // });
          }).catch(err => {
            console.log(err.message);
            res.status(500).json({
              message: err.message
            });
          });

        });
      } else {
        User.findOne({$or: [{username: req.body.username}, {email: req.body.email}]})
          .then(user => {
            if (!user) {
              return res.status(404).json({
                message: 'No user found'
              });
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password);
          })
          .then(result => {
            if (!result) {
              return res.status(404).json({
                message: 'Password incorrect!'
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
            // console.log('Server.login.token: ', token);
            return res.status(200).json({
              token: token,
              expiresIn: 3600
            })
          }, error => {
            return res.status(404).json({
              message: error.message
            });
          })
          .catch(err => {
            return res.status(404).json({
              message: err.message
            });
          });
      }

    });
  } else {
    User.findOne({$or: [{username: req.body.username}, {email: req.body.email}]})
      .then(user => {
        if (!user) {
          return res.status(404).json({
            message: 'No user found'
          });
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);
      })
      .then(result => {
        if (!result) {
          return res.status(404).json({
            message: 'Password incorrect!'
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
        // console.log('Server.login.token: ', token);
        return res.status(200).json({
          token: token,
          expiresIn: 3600
        })
      }, error => {
        return res.status(404).json({
          message: error.message
        });
      })
      .catch(err => {
        return res.status(404).json({
          message: err.message
        });
      });
  }
};


