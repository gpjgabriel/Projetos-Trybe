const joi = require('joi');

const post = joi.object({
  title: joi.string().required(),
  content: joi.string().required(),
  categoryIds: joi.array().required(),
});

module.exports = async (req, _res, next) => {
  const { title, content, categoryIds } = req.body;

  const { error } = post.validate({ title, content, categoryIds });

  if (error) next({ status: 400, message: 'Some required fields are missing' });

  next();
};
