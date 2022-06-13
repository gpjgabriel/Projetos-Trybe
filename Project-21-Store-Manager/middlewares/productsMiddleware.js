const joi = require('joi');
const productsService = require('../services/productsService');

const product = joi.object({
  name: joi.string().min(5).required(),
  quantity: joi.number().min(1).required(),
});

const productValidate = (req, _res, next) => {
  const { name, quantity } = req.body;

  const { error } = product.validate({ name, quantity });

  if (error) {
    const status = error.message.includes('required') ? 400 : 422;
    next({ status, message: error.message });
  }

  next();
};

const validateProductExist = async (req, _res, next) => {
  const { name } = req.body;
  try {
    await productsService.getName(name);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { productValidate, validateProductExist };