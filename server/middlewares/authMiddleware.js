const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  console.log('AUTH_MIDDLEWARE', authHeader)
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  const token = authHeader.split(' ')[1];
  if (!token || token === '') {
    req.isAuth = false;
    return next();
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
  } catch (err) {
    console.log('AUTH_MID_err')
    req.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    console.log('AUTH_MID_!decod')
    req.isAuth = false;
    return next();
  }
  console.log('AUTH_MID_SUCC')
  req.isAuth = true;
  req.userId = decodedToken.userId;
  next();
}