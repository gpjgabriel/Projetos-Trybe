const getContainer = document.querySelector('.container');
const getSectionCart = document.querySelector('.cart');
let totalPrice = 0;

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function rmSpanTotalPrice() {
  const getSpanTotalPrice = document.querySelector('.total-price');
  getSectionCart.removeChild(getSpanTotalPrice);
}

function createElementPrice(priceValue) {
  const spanTotalPriceValue = document.createElement('span');
  spanTotalPriceValue.className = 'total-price';
  spanTotalPriceValue.innerText = `${priceValue}`;
  getSectionCart.appendChild(spanTotalPriceValue);
}

function totalPriceValue(dataItem) {
  if (totalPrice === 0) {
    totalPrice = dataItem;
    return createElementPrice(totalPrice);
  }
  rmSpanTotalPrice();
  totalPrice += dataItem;
  const roundPrice = Math.round(totalPrice * 100) / 100;
  createElementPrice(roundPrice);
}

function getPriceRmElement(element) {
  const splitStringPrice = element.innerText.split('');
  const getIndexArr = splitStringPrice.indexOf('$');
  const getArrPrice = splitStringPrice.filter((value, index) => 
    (index > getIndexArr ? value : false));
  const getPriceRmItem = +(`-${getArrPrice.join('')}`);
  totalPriceValue(getPriceRmItem);
}

function cartItemClickListener({ target }) {
  const element = target;
  getPriceRmElement(target);
  element.className = 'cart__item_rm';
  const parentElement = target.parentNode;
  parentElement.removeChild(element);
  localStorage.removeItem('cartItems');
  saveCartItems(parentElement.innerHTML);
}

function btnClear() {
  const btn = document.querySelector('.empty-cart');
  btn.addEventListener('click', () => {
    const olItens = document.querySelector('ol');
    olItens.innerHTML = '';
    localStorage.removeItem('cartItems');
    rmSpanTotalPrice();
    totalPrice = 0;
  });
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function clickBtnAdd() {
  const buttons = document.querySelectorAll('.item__add');
  const olItens = document.querySelector('ol');
  buttons.forEach((btn) => {
    btn.addEventListener('click', async (event) => {
      const dataItem = await fetchItem(getSkuFromProductItem(event.target.parentNode));
      document.querySelector('.cart__items').appendChild(createCartItemElement(dataItem));
      saveCartItems(olItens.innerHTML);
      totalPriceValue(dataItem.price);
    });
  });
}

function getDataLocalStorage() {
  const data = getSavedCartItems();
  const olItens = document.querySelector('ol');
  olItens.innerHTML = data;
  const li = document.querySelectorAll('li');
  if (li.length !== 0) {
    li.forEach((item) => item.addEventListener('click', cartItemClickListener));
  }
}

function loading(value) {
  const insertH1 = document.createElement('h1');
  insertH1.className = 'loading';
  insertH1.innerHTML = value;
  getContainer.appendChild(insertH1);
}

function rmLoading() {
  const getH1 = document.querySelector('.loading');
  getContainer.removeChild(getH1);
  // console.log(getH1);
}

window.onload = async () => {
  //  Requisito 1 - Adicionar lista de Computadores
  loading('carregando...');
  const data = (await fetchProducts('computador')).results;
  const listItens = document.querySelector('.items');
  rmLoading();
  data.forEach((element) => {
    listItens.appendChild(createProductItemElement(element));
  });
  // Requisito 2 - Adicionar selecionado ao Carrinho
  clickBtnAdd();
  getDataLocalStorage();
  btnClear();
};
