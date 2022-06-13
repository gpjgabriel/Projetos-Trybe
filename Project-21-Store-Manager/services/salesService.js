const salesModel = require('../models/salesModel');

const msgError = (status, message) => ({
  status,
  message,
});

const getAll = async () => {
  const products = await salesModel.getAll();
  if (products.length === 0) {
    throw msgError(404, 'Sale not found');
  }
  return products;
};

const getId = async (id) => {
  const product = await salesModel.getId(id);
  if (product.length === 0) {
    throw msgError(404, 'Sale not found');
  }
  return product;
};

const removeProductStock = async (sale) => {
  await Promise.all(sale.map(({ productId, quantity }) =>
  salesModel.removeProductStock(productId, quantity)));
};

const addProductStock = async (sale) => {
  await Promise.all(sale.map(({ product_id, quantity }) =>
  salesModel.addProductStock(product_id, quantity)));
};

const addNewSale = async (sale) => {
  const saleId = await salesModel.addUpdatedDate();

  await Promise.all(sale.map(({ productId, quantity }) =>
  salesModel.addNewSale(saleId, productId, quantity)));

  return { id: saleId, itemsSold: sale };
};

const updateSale = async (saleId, itemUpdated) => {
  await getId(saleId);
  await Promise.all(itemUpdated.map(({ productId, quantity }) => 
  salesModel.updateSale(saleId, productId, quantity)));
  return { saleId, itemUpdated };
};

const deleteSale = async (saleId) => {
  await getId(saleId);
  const saleQuantity = await salesModel.quantityVerify(saleId);
  await addProductStock(saleQuantity);
  await salesModel.deleteSale(saleId);
};

module.exports = {
  getAll,
  getId,
  removeProductStock,
  addNewSale,
  updateSale,
  deleteSale,
};