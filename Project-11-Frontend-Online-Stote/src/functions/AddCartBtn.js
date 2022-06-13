// import { getProducts } from '../services/api';
// ADICIONAR O ID AO LOCAL STORAGE
export default async function AddCartBtn(item) {
  console.log(item);
  const cart = localStorage.getItem('cartList');
  if (cart !== null) {
    localStorage.setItem('cartList', [...cart.split(','), item.id]);
  } else {
    localStorage.setItem('cartList', [item.id]);
  }

  // ADICIONAR O OBJETO COMPLETO DO PRODUTO AO LOCAL STORAGE
  // const result = await getProducts(item.id);
  const productList = JSON.parse(localStorage.getItem('productList'));
  if (productList !== null) {
    localStorage.setItem('productList',
      JSON.stringify([...productList, item]));
  } else {
    localStorage.setItem('productList', JSON.stringify([item]));
  }
}
