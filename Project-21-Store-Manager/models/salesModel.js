const connection = require('./connection');

const getAll = async () => {
  const querySales = `
    SELECT
      sp.sale_id AS saleId,
      sp.product_id AS productId,
      sp.quantity,
      sa.date
    FROM StoreManager.sales_products AS sp
    JOIN StoreManager.sales AS sa
    ON sa.id = sp.sale_id
    ORDER BY saleId, productId;`;
  const [sales] = await connection.query(querySales);
  return sales;
};

const getId = async (id) => {
  const queryId = `
  SELECT
    sp.product_id AS productId,
    sp.quantity,
    sa.date
  FROM StoreManager.sales_products AS sp
  JOIN StoreManager.sales AS sa
  ON sa.id = sp.sale_id
  WHERE sp.sale_id = ?;`;
  const [product] = await connection.execute(queryId, [id]);
  return product;
};

const addUpdatedDate = async () => {
  const queryUpdatedDate = 'INSERT INTO StoreManager.sales (date) VALUES (NOW());';
  const [{ insertId }] = await connection.query(queryUpdatedDate);
  return insertId;
};

const removeProductStock = async (id, quantity) => {
  const queryRemove = 'UPDATE StoreManager.products SET quantity = quantity-? WHERE id = ?;';
  await connection.execute(queryRemove, [quantity, id]);
};

const addNewSale = async (saleId, productId, quantity) => {
  const queryAddSale = `
    INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) 
    VALUES (?,?,?);`;
  await connection.execute(queryAddSale, [saleId, productId, quantity]);
};

const updateSale = async (saleId, productId, quantity) => {
  const queryUpdateSale = `
    UPDATE StoreManager.sales_products
    SET quantity = ?
    WHERE sale_id=? AND product_id = ?;`;
  await connection.execute(queryUpdateSale, [quantity, saleId, productId]);
};

const quantityVerify = async (saleId) => {
  const queryQuantity = `
    SELECT product_id, quantity
    FROM StoreManager.sales_products
    WHERE sale_id = ?;`;
  const [quantity] = await connection.execute(queryQuantity, [saleId]);
  return quantity;
};

const addProductStock = async (id, quantity) => {
  const queryAdd = 'UPDATE StoreManager.products SET quantity = quantity+? WHERE id = ?;';
  await connection.execute(queryAdd, [quantity, id]);
};

const deleteSale = async (saleId) => {
  const queryDelSale = 'DELETE FROM StoreManager.sales WHERE id = ?;';
  const queryDelProduct = 'DELETE FROM StoreManager.sales_products WHERE sale_id = ?;';

  await connection.execute(queryDelSale, [saleId]);
  await connection.execute(queryDelProduct, [saleId]);
};

module.exports = {
  getAll,
  getId,
  addUpdatedDate,
  removeProductStock,
  addNewSale,
  updateSale,
  quantityVerify,
  addProductStock,
  deleteSale,
};