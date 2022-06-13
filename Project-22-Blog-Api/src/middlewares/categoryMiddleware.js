const joi = require('joi');

const category = joi.object({
  name: joi.string().required(),
});

module.exports = (req, _res, next) => {
  const { name } = req.body;

  const { error } = category.validate({ name });

  if (error) next({ status: 400, message: error.message });

  next();
};