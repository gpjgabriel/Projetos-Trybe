import React from 'react';
import { Link } from 'react-router-dom';
import CartItems from '../components/CartItems';

class Cart extends React.Component {
  render() {
    const productList = JSON.parse(localStorage.getItem('productList')) || [];
    return (
      productList.length ? (
        <div>
          <Link to="/finalizepurchase">
            <button
              type="button"
              data-testid="checkout-products"
            >
              Finalizar compra!
            </button>
          </Link>
          {productList.map((item) => (
            <section key={ item.id }>
              <CartItems item={ item } />
            </section>
          ))}
        </div>
      ) : (
        <p data-testid="shopping-cart-empty-message"> Seu carrinho está vazio</p>
      )
    );
  }
}

export default Cart;
