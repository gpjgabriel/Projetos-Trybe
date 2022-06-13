const express = require('express');
const rescue = require('express-rescue');

const productsController = require('../controllers/productsController');
const productsMiddleware = require('../middlewares/productsMiddleware');

const productsRoute = express.Router();

productsRoute.get('/', rescue(productsController.getAll));
productsRoute.get('/:id', rescue(productsController.getId));

productsRoute.post('/',
  rescue(productsMiddleware.productValidate),
  rescue(productsMiddleware.validateProductExist),
  rescue(productsController.addNewProduct));

productsRoute.put('/:id',
  rescue(productsMiddleware.productValidate),
  rescue(productsController.updateProduct));

productsRoute.delete('/:id', rescue(productsController.deleteProduct));

module.exports = productsRoute;