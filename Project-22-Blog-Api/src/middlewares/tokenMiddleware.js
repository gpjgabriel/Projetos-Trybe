const jwt = require('../getJwt');

module.exports = (req, _res, next) => {
  const { authorization: token } = req.headers;

  if (!token) next({ status: 401, message: 'Token not found' });

  try {
    const { data: { id } } = jwt.decode(token);
    req.userId = id;
  } catch (error) {
    next({ status: 401, message: 'Expired or invalid token' });
  }

  next();
};