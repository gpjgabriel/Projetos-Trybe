export async function getCategories() {
  const request = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const requestJSON = await request.json();
  return requestJSON;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const request = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  const requestJSON = await request.json();
  return requestJSON;
}

export async function getProductsFromCategory(category) {
  const request = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${category}`);
  const requestJSON = await request.json();
  return requestJSON.results;
}

export async function getProducts(product) {
  const request = await fetch(`https://api.mercadolibre.com/items/${product}`);
  const requestJSON = await request.json();
  return requestJSON;
}
