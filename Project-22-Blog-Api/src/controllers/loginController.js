const { loginService } = require('../services/loginService');
const jwt = require('../getJwt');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await loginService(email, password);

    const token = jwt.encode(user);

    return res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
};