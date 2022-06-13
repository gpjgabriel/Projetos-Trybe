const loginRoute = require('express').Router();
const { login } = require('../controllers/loginController');
const loginMiddleware = require('../middlewares/loginMiddleware');

loginRoute.post('/', loginMiddleware, login);

module.exports = loginRoute;