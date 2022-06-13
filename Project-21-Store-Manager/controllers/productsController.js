const productsService = require('../services/productsService');

const getAll = async (_req, res, next) => {
  try {
    const products = await productsService.getAll();
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const getId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const [product] = await productsService.getId(id);
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

const addNewProduct = async (req, res, next) => {
  const { name, quantity } = req.body;
  try {
    const id = await productsService.addNewProduct(name, quantity);
    return res.status(201).json({ id, name, quantity });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
  
    const product = { id: parseInt(id, 10), name, quantity };
  
    await productsService.updateProduct(product);
  
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params; 
  
    await productsService.deleteProduct(id);
  
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getId,
  addNewProduct,
  updateProduct,
  deleteProduct,
};