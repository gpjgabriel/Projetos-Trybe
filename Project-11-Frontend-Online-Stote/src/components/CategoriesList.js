import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';

class CategoriesList extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      title: '',
      image: '',
      price: '',
      id: '',
    };
  }

  componentDidMount() {
    this.getProps();
  }

  getProps = () => {
    this.setState({
      loading: true,
    }, () => {
      const {
        title,
        image,
        price,
        id,
      } = this.props;
      this.setState({
        loading: false,
        title,
        image,
        price,
        id,
      });
    });
  }

  handleCLick = () => {
    const { id } = this.state;
    this.saveInLocalStorage(id);
  }

  saveInLocalStorage = (item) => {
    localStorage.setItem('itemDetail', JSON.stringify(item));
  }

  render() {
    const {
      loading,
      title,
      image,
      price,
      id,
    } = this.state;
    return (
      (loading ? <Loading /> : (
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
      )));
  }
}

CategoriesList.propTypes = {
  title: propTypes.string.isRequired,
  image: propTypes.string.isRequired,
  price: propTypes.number.isRequired,
  id: propTypes.string.isRequired,
};

export default CategoriesList;
