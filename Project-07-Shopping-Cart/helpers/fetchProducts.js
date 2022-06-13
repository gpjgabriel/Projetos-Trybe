const fetchProducts = async (product) => {
  const urlApiMl = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
  try {
    const response = await fetch(urlApiMl);
    const data = await response.json();
    return data;
  } catch (msgError) {
    return new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
