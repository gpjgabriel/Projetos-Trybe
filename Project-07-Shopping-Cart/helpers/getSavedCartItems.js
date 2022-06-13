// const getSavedCartItems = () => JSON.parse(localStorage.getItem('cartItems'));
const getSavedCartItems = () => localStorage.getItem('cartItems');

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
