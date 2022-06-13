import React from 'react';
import { getCategories, getProductsFromCategory } from '../services/api';
import Loading from '../pages/Loading';
import CategoriesList from './CategoriesList';
import AddCartBtn from '../functions/AddCartBtn';

class CategoriesSidebar extends React.Component {
  constructor() {
    super();
    this.state = {
      categoriesList: '',
      list: [],
      loading: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.apiCall();
  }

  handleClick({ target }) {
    this.setState({
      loading: true,
    }, async () => {
      const result = await getProductsFromCategory(target.value);
      this.setState({
        list: [...result],
        loading: false,
      });
    });
  }

  apiCall() {
    this.setState({
      loading: true,
    }, async () => {
      const result = await getCategories();
      this.setState({
        categoriesList: result,
        loading: false,
      });
    });
  }

  render() {
    const {
      categoriesList,
      list,
      loading,
    } = this.state;
    return (
      (loading ? <Loading /> : (
        <div>
          <aside>
            <ul>
              { categoriesList
        && categoriesList.map(({ name, id }) => (
          <button
            type="button"
            data-testid="category"
            key={ id }
            value={ id }
            onClick={ this.handleClick }
          >
            {name}
          </button>)) }
            </ul>
          </aside>
          <div>
            { list.length >= 1 && (
              list.map((item) => (
                <div key={ item.id }>
                  <CategoriesList
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
                    Adicionar ao carrinho
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )));
  }
}

export default CategoriesSidebar;
