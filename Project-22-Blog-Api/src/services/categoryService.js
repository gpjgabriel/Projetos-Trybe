const { Category } = require('../database/models');

const createCategory = async (name) => {
  const newCategory = await Category.create({ name });

  const { id } = newCategory;

  return { id, name };
};

const getAllCategories = async () => {
  const allCategories = await Category.findAll();

  return allCategories;
};

module.exports = {
  createCategory,
  getAllCategories,
};