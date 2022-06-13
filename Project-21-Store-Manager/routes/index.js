const express = require('express');

const productsRoute = require('./productsRoute');
const salesRoute = require('./salesRoute');

const router = express.Router();

router.use('/products', productsRoute);
router.use('/sales', salesRoute);

module.exports = router;