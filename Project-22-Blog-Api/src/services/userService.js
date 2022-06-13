const { User } = require('../database/models');

const msgError = (status, message) => ({
  status,
  message,
});

const createUser = async ({ displayName, email, password, image }) => {
  const user = await User.findOne({ where: { email } });

  if (user) throw msgError(409, 'User already registered');

  const newUser = await User.create({
    displayName,
    email,
    password,
    image,
  });

  const { id } = newUser;

  return {
    id,
    displayName,
    email,
    image,
  };
};

const getAllUsers = async () => {
  const allUsers = await User.findAll({ attributes: { exclude: ['password'] } });

  return allUsers;
};

const getUserId = async (userId) => {
  const user = await User.findByPk(userId);

  if (!user) throw msgError(404, 'User does not exist');

  const { id, displayName, email, image } = user;

  return {
    id,
    displayName,
    email,
    image,
  };
};

module.exports = {
  createUser,
  getAllUsers,
  getUserId,
};