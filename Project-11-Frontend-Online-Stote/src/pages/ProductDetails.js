import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';
import { getProducts } from '../services/api';
import AddCartBtn from '../functions/AddCartBtn';

class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      item: [],
      redirect: false,
      inputEmail: '',
      avaliation: '',
      comment: '',
      list: JSON.parse(localStorage.getItem('comment')) || [],
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.requestApi();
  }

  handleClick(event) {
    event.preventDefault();
    this.setState((prev) => ({
      list: [...prev.list, {
        inputEmail: prev.inputEmail,
        avaliation: prev.avaliation,
        comment: prev.comment,
      }],
    }), () => {
      const { list } = this.state;
      localStorage.setItem('comment', JSON.stringify(list));
    });
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  }

  clickCartBtn = () => {
    this.setState({
      redirect: true,
    });
  }

  requestApi() {
    this.setState({
      loading: true,
    }, async () => {
      const id = JSON.parse(localStorage.getItem('itemDetail'));
      const result = await getProducts(id);
      console.log(result);
      this.setState({
        item: [result],
        loading: false,
      });
    });
  }

  render() {
    const {
      item,
      redirect,
      inputEmail,
      comment,
      list,
      loading,
    } = this.state;
    return (
      (loading ? <Loading /> : (
        <div>
          { redirect && <Redirect to="/cart" />}
          <button
            type="button"
            data-testid="shopping-cart-button"
            onClick={ this.clickCartBtn }
          >
            Carrinho
          </button>
          { item.map((element) => (
            <div key={ element.id }>
              <h2 data-testid="product-detail-name">
                {element.title}
              </h2>
              <img src={ element.thumbnail } alt={ element.title } />
              <h4>
                {`Preço: R$ ${element.price}`}
              </h4>
              <button
                type="button"
                data-testid="product-detail-add-to-cart"
                value={ element.id }
                onClick={ () => AddCartBtn(element) }
              >
                Adicionar ao Carrinho
              </button>
              <section>
                <h3>Especificações técnicas</h3>
                <ul>
                  { element.attributes.map((attribute) => (
                    <li key={ attribute.id }>
                      <h3>{attribute.name}</h3>
                      <p>{ attribute.value_name }</p>
                    </li>
                  ))}
                </ul>
              </section>
              <form onSubmit={ this.handleClick }>
                <input
                  data-testid="product-detail-email"
                  id="inputEmail"
                  type="email"
                  value={ inputEmail }
                  name="inputEmail"
                  onChange={ this.handleChange }
                />
                <input
                  key="1"
                  data-testid="1-rating"
                  id="1"
                  type="radio"
                  value="1"
                  name="avaliation"
                  onChange={ this.handleChange }
                />
                <input
                  key="2"
                  data-testid="2-rating"
                  id="2"
                  type="radio"
                  value="2"
                  name="avaliation"
                  onChange={ this.handleChange }
                />
                <input
                  key="3"
                  data-testid="3-rating"
                  id="3"
                  type="radio"
                  value="3"
                  name="avaliation"
                  onChange={ this.handleChange }
                />
                <input
                  key="4"
                  data-testid="4-rating"
                  id="4"
                  type="radio"
                  value="4"
                  name="avaliation"
                  onChange={ this.handleChange }
                />
                <input
                  key="5"
                  data-testid="5-rating"
                  id="5"
                  type="radio"
                  value="5"
                  name="avaliation"
                  onChange={ this.handleChange }
                />
                <textarea
                  data-testid="product-detail-evaluation"
                  id="comment"
                  name="comment"
                  value={ comment }
                  onChange={ this.handleChange }
                />
                <button
                  type="submit"
                  data-testid="submit-review-btn"
                >
                  Submit
                </button>
              </form>
              { list.length !== 0 && list.map((ele, index) => (
                <div key={ index }>
                  <h3>{ ele.inputEmail }</h3>
                  <p>{ ele.avaliation }</p>
                  <p>{ele.comment}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )));
  }
}

export default ProductDetails;
