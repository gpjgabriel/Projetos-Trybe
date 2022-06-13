const salesService = require('../services/salesService');

const getAll = async (_req, res, next) => {
  try {
    const products = await salesService.getAll();
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const getId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await salesService.getId(id);
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

const removeProductStock = async (req, _res, next) => {
  const sale = req.body;
  await salesService.removeProductStock(sale);
  next();
};

const addNewSale = async (req, res) => {
  const sale = req.body;
  const newSale = await salesService.addNewSale(sale);
  return res.status(201).json(newSale);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const sale = req.body;
  const saleUpdated = await salesService.updateSale(id, sale);
  return res.status(200).json(saleUpdated);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  await salesService.deleteSale(id);
  return res.status(204).end();
};

module.exports = {
  getAll,
  getId,
  removeProductStock,
  addNewSale,
  updateSale,
  deleteSale,
};