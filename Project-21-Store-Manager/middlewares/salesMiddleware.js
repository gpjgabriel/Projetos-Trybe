const joi = require('joi');
// const salesService = require('../services/salesService');
const productsModel = require('../models/productsModel');

const sales = joi.object({
  productId: joi.number().min(1).required(),
  quantity: joi.number().min(1).required(),
});

const msgError = (status, message) => ({
  status,
  message,
});

const salesValidate = (req, _res, next) => {
  const arrSales = req.body;

  arrSales.forEach(({ productId, quantity }) => {
    const { error } = sales.validate({ productId, quantity });
    if (error) {
      const status = error.message.includes('required') ? 400 : 422;
      next({ status, message: error.message });
    }
  });

  next();
};

const stockValidate = async (req, _res, next) => {
  const sale = req.body;

    const stock = await Promise.all(sale.map(async ({ productId, quantity }) => {
      const [product] = await productsModel.getId(productId);
      const stockQuantity = product.quantity;
      if (quantity > stockQuantity) {
        return false;
      } return true;
    }));

    stock.map((products) => {
      if (!products) throw msgError(422, 'Such amount is not permitted to sell');
      return true;
    });
    next();
};

module.exports = { salesValidate, stockValidate };