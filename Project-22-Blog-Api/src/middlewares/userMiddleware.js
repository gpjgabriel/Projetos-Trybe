const joi = require('joi');

const user = joi.object({
  displayName: joi.string().min(8),
  email: joi.string().email(),
  password: joi.string().min(6),
});

module.exports = (req, _res, next) => {
  const { displayName, email, password } = req.body;

  const { error } = user.validate({
    displayName,
    email,
    password,
  });

  if (error) next({ status: 400, message: error.message });

  next();
};