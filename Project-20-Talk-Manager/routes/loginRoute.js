const express = require('express');
const bodyParser = require('body-parser');
const generateToken = require('../middlewares/generateToken');
const validateEmail = require('../middlewares/validateEmail');
const validatePasswd = require('../middlewares/validatePasswd');

const HTTP_OK_STATUS = 200;

const router = express.Router();
router.use(bodyParser.json());

router.post('', validateEmail, validatePasswd, generateToken, (req, res) => {
  const { token } = req;
  return res.status(HTTP_OK_STATUS).json({ token });
});

module.exports = router;