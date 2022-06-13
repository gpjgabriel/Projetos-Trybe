const router = require('express').Router();
const loginRoute = require('./loginRoute');
const userRoute = require('./userRoute');
const categoryRoute = require('./categoryRoute');
const postRoute = require('./postRoute');

router.use('/login', loginRoute);
router.use('/user', userRoute);
router.use('/categories', categoryRoute);
router.use('/post', postRoute);

module.exports = router;