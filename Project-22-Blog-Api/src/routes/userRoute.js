const userRoute = require('express').Router();
const { createUser, getAllUsers, getUserId } = require('../controllers/userController');
const userMiddleware = require('../middlewares/userMiddleware');
const tokenMiddleware = require('../middlewares/tokenMiddleware');

userRoute.post('/', userMiddleware, createUser);

userRoute.get('/', tokenMiddleware, getAllUsers);
userRoute.get('/:id', tokenMiddleware, getUserId);

module.exports = userRoute;