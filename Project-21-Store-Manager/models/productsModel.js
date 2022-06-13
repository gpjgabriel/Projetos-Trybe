const connection = require('./connection');

const getAll = async () => {
  const queryProducts = 'SELECT * FROM StoreManager.products;';
  const [products] = await connection.query(queryProducts);
  return products;
};

const getId = async (id) => {
  const queryId = `SELECT * FROM StoreManager.products
    WHERE id = ?
    ORDER BY id ASC;`;
  const [product] = await connection.execute(queryId, [id]);
  return product;
};

const getName = async (name) => {
  const queryName = `
    SELECT * FROM StoreManager.products
    WHERE name = ?;`;
  
  const [product] = await connection.execute(queryName, [name]);
  return product; 
};

const addNewProduct = async (name, quantity) => {
  const queryNewProduct = `
    INSERT INTO StoreManager.products (name, quantity)
    VALUES (?,?);`;
  
  const [{ insertId }] = await connection.execute(queryNewProduct, [name, quantity]);

  return insertId;
};

const updateProduct = async (id, name, quantity) => {
  const queryUpdate = `
    UPDATE StoreManager.products
    SET name = ?,
    quantity = ?
    WHERE id = ?;`;

  const product = await connection.execute(queryUpdate, [name, quantity, id]);
  return product;
};

const deleteProduct = async (id) => {
  const queryDelete = `
    DELETE FROM StoreManager.products
    WHERE id = ?;`;
  const productDelete = await connection.execute(queryDelete, [id]);
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