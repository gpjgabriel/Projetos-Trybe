const productModel = require('../models/productsModel');

const msgError = (status, message) => ({
  status,
  message,
});

const getAll = async () => {
  const products = await productModel.getAll();
  if (products.length === 0) {
    throw msgError(404, 'Product not found');
  }
  return products;
};

const getId = async (id) => {
  const product = await productModel.getId(id);
  if (product.length === 0) {
    throw msgError(404, 'Product not found');
  }
  return product;
};

const getName = async (name) => {
  const product = await productModel.getName(name);

  if (product.length !== 0) {
    throw msgError(409, 'Product already exists');
  }
  return product;
};

const addNewProduct = async (name, quantity) => {
  const productId = await productModel.addNewProduct(name, quantity);
  return productId;
};

const updateProduct = async (product) => {
  const { id, name, quantity } = product;
  const productId = await productModel.getId(id);
  if (productId.length === 0) {
    throw msgError(404, 'Product not found');
  }
  const productUpdate = await productModel.updateProduct(id, name, quantity);
  return productUpdate;
};

const deleteProduct = async (id) => {
  const productId = await productModel.getId(id);
  if (productId.length === 0) {
    throw msgError(404, 'Product not found');
  }
  const productDelete = await productModel.deleteProduct(id);
  return productDelete;
};

module.exports = {
  getAll,
  getId,
  getName,
  addNewProduct,
  updateProduct,
  deleteProduct,
};