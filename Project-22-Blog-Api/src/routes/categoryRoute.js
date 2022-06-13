const categoryRoute = require('express').Router();
const { createCategory, getAllCategories } = require('../controllers/categoryController');
const categoryMiddleware = require('../middlewares/categoryMiddleware');
const tokenMiddleware = require('../middlewares/tokenMiddleware');

categoryRoute.post('/', tokenMiddleware, categoryMiddleware, createCategory);

categoryRoute.get('/', tokenMiddleware, getAllCategories);

module.exports = categoryRoute;