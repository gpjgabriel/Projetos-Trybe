const { User } = require('../database/models');

const msgError = (status, message) => ({
  status,
  message,
});

const loginService = async (email, password) => {
  const user = await User.findOne({ where: { email, password } });

  if (!user) throw msgError(400, 'Invalid fields');

  return user;
};

module.exports = {
  loginService,
};