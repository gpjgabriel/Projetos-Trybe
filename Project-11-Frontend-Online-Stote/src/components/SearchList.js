import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

class SearchList extends Component {
  handleCLick = () => {
    const { id } = this.props;
    localStorage.setItem('itemDetail', JSON.stringify(id));
  }

  render() {
    const {
      title,
      image,
      price,
      id,
    } = this.props;

    return (
      <div>
        <Link
          to={ `/productdetails/${id}` }
          data-testid="product-detail-link"
          onClick={ this.handleCLick }
        >
          <div data-testid="product">
            <h1>{ title }</h1>
            <img
              src={ image }
              alt={ title }
            />
            <p>{`R$: ${price}`}</p>
          </div>
        </Link>
      </div>
    );
  }
}

SearchList.propTypes = {
  title: propTypes.string.isRequired,
  image: propTypes.string.isRequired,
  price: propTypes.number.isRequired,
  id: propTypes.string.isRequired,
};

export default SearchList;
