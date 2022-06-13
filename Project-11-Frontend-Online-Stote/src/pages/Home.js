import React from 'react';
import { Redirect } from 'react-router-dom';
import CategoriesSidebar from '../components/CategoriesSidebar';
import SearchList from '../components/SearchList';
import Loading from './Loading';
import { getProductsFromCategoryAndQuery } from '../services/api';
import AddCartBtn from '../functions/AddCartBtn';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      redirect: false,
      searchInput: '',
      itemList: [],
    };
  }

  clickCartBtn = () => {
    this.setState({
      redirect: true,
    });
  }

  inputChange= ({ target }) => {
    this.setState({
      searchInput: target.value,
    });
  }

  clickSearchBtn = () => {
    this.setState({
      loading: true,
    }, () => {
      const { searchInput } = this.state;
      getProductsFromCategoryAndQuery(undefined, searchInput).then((res) => {
        this.setState({
          itemList: [...res.results],
          loading: false,
        });
      });
    });
  }

  render() {
    const {
      loading,
      redirect,
      searchInput,
      itemList,
    } = this.state;

    return (
      (loading ? <Loading /> : (
        <>
          { redirect && <Redirect to="/cart" /> }
          <label htmlFor="home-initial-message">
            <span
              data-testid="home-initial-message"
            >
              Digite algum termo de pesquisa ou escolha uma categoria.
            </span>
            <input
              type="text"
              id="home-initial-message"
              data-testid="query-input"
              value={ searchInput }
              onChange={ this.inputChange }
            />
            <button
              type="button"
              onClick={ this.clickSearchBtn }
              data-testid="query-button"
            >
              Pesquisar
            </button>
          </label>
          <button
            type="button"
            data-testid="shopping-cart-button"
            onClick={ this.clickCartBtn }
          >
            Carrinho
          </button>
          <CategoriesSidebar />
          { itemList.length >= 1 && (
            itemList.map((item) => (
              <div key={ item.id }>
                <SearchList
                  title={ item.title }
                  image={ item.thumbnail }
                  price={ item.price }
                  id={ item.id }
                />
                <button
                  type="button"
                  data-testid="product-add-to-cart"
                  onClick={ () => AddCartBtn(item) }
                  value={ item.id }
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            )))}
        </>
      )
      ));
  }
}

export default Home;
