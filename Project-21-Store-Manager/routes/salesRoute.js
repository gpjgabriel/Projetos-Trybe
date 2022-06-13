const express = require('express');
const rescue = require('express-rescue');

const salesController = require('../controllers/salesController');
const salesMiddleware = require('../middlewares/salesMiddleware');

const salesRoute = express.Router();

salesRoute.get('/', rescue(salesController.getAll));
salesRoute.get('/:id', rescue(salesController.getId));

salesRoute.post('/',
  rescue(salesMiddleware.salesValidate),
  rescue(salesMiddleware.stockValidate),
  rescue(salesController.removeProductStock),
  rescue(salesController.addNewSale));

salesRoute.put('/:id',
  rescue(salesMiddleware.salesValidate),
  rescue(salesController.updateSale));

salesRoute.delete('/:id',
  rescue(salesController.deleteSale));

module.exports = salesRoute;