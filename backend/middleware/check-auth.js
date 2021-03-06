const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    // console.log('decodedToken: ', decodedToken);
    req.userData = {
      email: decodedToken.email,
      username: decodedToken.username,
      // userId: decodedToken
    };
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Invalid token'
    });
  }


};
