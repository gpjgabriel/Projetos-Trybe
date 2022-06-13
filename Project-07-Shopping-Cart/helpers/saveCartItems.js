// let arrItemStorage = [];

// const saveCartItems = (item) => {
//   if (item === undefined) {
//     arrItemStorage = [];
//   } else {
//     localStorage.setItem('cartItems', item);
//     localStorage.setItem('cartItems', [...arrItemStorage, item]);
//   }
// };

const saveCartItems = (item) => {
  localStorage.setItem('cartItems', item);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
