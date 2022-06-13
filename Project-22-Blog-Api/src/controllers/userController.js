const userService = require('../services/userService');
const jwt = require('../getJwt');

const createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);

    const token = jwt.encode(user);

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (_req, res, next) => {
  try {
    const users = await userService.getAllUsers();

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getUserId = async (req, res, next) => {
  try {
    const { id } = req.params;
  
    const user = await userService.getUserId(id);
  
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserId,
};