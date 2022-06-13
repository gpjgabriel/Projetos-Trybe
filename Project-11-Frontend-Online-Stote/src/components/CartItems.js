import React from 'react';
import propTypes from 'prop-types';

class CartItems extends React.Component {
  constructor() {
    super();
    this.state = {
      amount: 1,
    };
  }

  handleClickAdd = () => {
    const { amount } = this.state;
    this.setState({
      amount: amount + 1,
    });
  }

  handleClickReduce = () => {
    const { amount } = this.state;
    if (amount === 0) {
      this.setState({
        amount: 0,
      });
    } else {
      this.setState({
        amount: amount - 1,
      });
    }
  }

  handleClickRemove = (itemId) => {
    const productList = JSON.parse(localStorage.getItem('productList'));
    const attProducList = productList.filter((products) => products.id !== itemId);
    localStorage.setItem('productList', JSON.stringify(attProducList));
    console.log(attProducList);
  }

  render() {
    const { amount } = this.state;
    const { item } = this.props;
    return (
      <div>
        <h1 data-testid="shopping-cart-product-name">
          {item.title}
        </h1>
        <img src={ item.thumbnail } alt={ item.title } />
        <p>{item.price}</p>
        <button
          type="button"
          data-testid="product-increase-quantity"
          onClick={ this.handleClickAdd }
          id={ item.id }
        >
          +
        </button>
        <h3
          data-testid="shopping-cart-product-quantity"
        >
          {`Quantidade: ${amount}`}
        </h3>
        <button
          type="button"
          data-testid="product-decrease-quantity"
          onClick={ this.handleClickReduce }
          id={ item.id }
        >
          -
        </button>
        <button
          type="button"
          onClick={ () => this.handleClickRemove(item.id) }
          id={ item.id }
        >
          Remover do Carrinho
        </button>
      </div>
    );
  }
}

CartItems.propTypes = {
  item: propTypes.objectOf(Object).isRequired,
};

export default CartItems;
