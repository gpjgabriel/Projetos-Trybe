import React, { Component } from 'react';
// import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { getProducts } from '../services/api';

export default class FinalizePurchase extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    const localStorage = this.getLocalStorage();
    localStorage.forEach((id) => {
      this.requestProduct(id);
    });
  }

  getLocalStorage = () => {
    const item = localStorage.getItem('cartList');
    return item !== null ? item.split(',') : [];
  }

  requestProduct = async (id) => {
    const product = await getProducts(id);
    this.setState((prev) => ({
      products: [...prev.products, product],
    }));
  }

  render() {
    const { products } = this.state;
    return (
      <form>
        <section>
          <h1>Revise seus Produtos</h1>
          <ul className="list">
            {products && products.map((product) => (
              <li className="containerList" key={ product.id }>
                <img
                  src={ product.thumbnail }
                  alt={ product.title }
                />
                <p>{product.title}</p>
                <p className="text">{`R$ ${product.price}`}</p>
              </li>))}
          </ul>
          <h2>Total:</h2>
        </section>
        <section className="Formulario">
          <h3>Informações do Comprador</h3>
          <input
            data-testid="checkout-fullname"
            name="inputName"
            className="inputText inputTextName"
            type="text"
            placeholder="Nome Completo"
            required
          />
          <input
            data-testid="checkout-cpf"
            className="inputText"
            type="text"
            placeholder="CPF"
            required
          />
          <input
            data-testid="checkout-email"
            className="inputText inputTextMedio"
            type="email"
            placeholder="E-mail"
            required
          />
          <input
            data-testid="checkout-phone"
            className="inputText"
            type="tel"
            placeholder="Telefone"
            required
          />
          <input
            data-testid="checkout-cep"
            className="inputText"
            type="text"
            placeholder="CEP"
            required
          />
          <input
            data-testid="checkout-address"
            className="inputText inputTextMedio"
            type="text"
            placeholder="Endereço"
            required
          />
          <input
            className="inputText inputTextMedio"
            type="text"
            placeholder="Complemento"
            required
          />
          <input
            className="inputText"
            type="text"
            placeholder="Número"
            required
          />
          <input
            className="inputText inputTextMedio"
            type="text"
            placeholder="Cidade"
            required
          />
        </section>

        <section className="pagamentos">
          <section>
            <h3 className="titulo">
              Método de Pagamento
            </h3>
          </section>

          <div className="metodoBoleto">

            <h4 className="subtitulo">Boleto</h4>
            <div className="metodo">
              <input className="radio" type="radio" name="metodo" required />
              <img
                className="imgMetodo"
                src="https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_300,h_188/https://www.pauladietaflex.com/wp-content/uploads/2020/06/icon-pag-boleto-300x188.png"
                alt="Boleto"
              />
            </div>

          </div>

          <div className="metodoBoleto">

            <h4 className="subtitulo">Cartão de Crédito</h4>
            <div className="metodo">
              <input className="radio" type="radio" name="metodo" required />
              <img
                className="imgMetodo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Old_Visa_Logo.svg/2560px-Old_Visa_Logo.svg.png"
                alt="CartaoVisa"
              />

              <input className="radio" type="radio" name="metodo" required />
              <img
                className="imgMetodo"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQpkiN-ObjSwqvDrKnMaykYUKlWNmmXipjIhRapnf_yYmowB2MQAszgMZyJrLm0wJmwBI&usqp=CAU"
                alt="CartaoElo"
              />

              <input className="radio" type="radio" name="metodo" required />
              <img
                className="imgMetodo"
                src="http://www.bh1.com.br/wp-content/uploads/2018/05/logomarca-mastercard.gif"
                alt="Boleto"
              />
            </div>

          </div>

        </section>
        <button
          className="button"
          type="submit"
        >
          Comprar
        </button>
      </form>
    );
  }
}
