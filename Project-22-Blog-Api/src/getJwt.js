const jwt = require('jsonwebtoken');

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const encode = (user) => jwt.sign({ data: user }, process.env.JWT_SECRET, jwtConfig);

const decode = (token) => jwt.verify(token, process.env.JWT_SECRET);

module.exports = {
  encode,
  decode,
};