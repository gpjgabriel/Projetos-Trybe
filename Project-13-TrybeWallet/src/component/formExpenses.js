import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { fetchApiExpensesAction } from '../actions';
import EditFormExpenses from './EditFormExpenses';

class FormExpenses extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };
  }

  componentDidMount() {
    this.getCurrencyApi();
  }

  getCurrencyApi = () => {
    const { inputFormChange } = this.props;
    inputFormChange(null);
  }

  btnCLick = () => {
    const { inputFormChange } = this.props;
    inputFormChange(this.state);
    this.setState(({ id }) => ({
      id: id + 1,
      value: '',
      description: '',
    }));
  }

  inputChange = ({ target }) => {
    this.setState({
      [target.id]: target.value,
    });
  }

  render() {
    const {
      value,
      currency,
      method,
      tag,
      description,
    } = this.state;

    const { error, currencies, loadFormEdit } = this.props;

    if (error) console.error(error);

    return (
      <div>
        {/* { loading ? <span>Loading...</span> : ( */}
        { loadFormEdit ? <EditFormExpenses /> : (
          <form>
            <label htmlFor="value">
              Valor:
              <input
                type="text"
                data-testid="value-input"
                id="value"
                value={ value }
                onChange={ this.inputChange }
              />
            </label>
            <label htmlFor="currency">
              Moeda:
              <select
                type="text"
                data-testid="currency-input"
                id="currency"
                value={ currency }
                onChange={ this.inputChange }
              >
                {currencies.map((currencyMap) => (
                  <option
                    data-testid={ currencyMap }
                    key={ currencyMap }
                  >
                    { currencyMap }
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="method">
              Método de Pagamento:
              <select
                type="text"
                data-testid="method-input"
                id="method"
                value={ method }
                onChange={ this.inputChange }
              >
                <option>Dinheiro</option>
                <option>Cartão de crédito</option>
                <option>Cartão de débito</option>
              </select>
            </label>
            <label htmlFor="tag">
              Tag:
              <select
                type="text"
                data-testid="tag-input"
                id="tag"
                value={ tag }
                onChange={ this.inputChange }
              >
                <option>Alimentação</option>
                <option>Lazer</option>
                <option>Trabalho</option>
                <option>Transporte</option>
                <option>Saúde</option>
              </select>
            </label>
            <label htmlFor="description">
              Descrição:
              <input
                type="text"
                data-testid="description-input"
                id="description"
                value={ description }
                onChange={ this.inputChange }
              />
            </label>
            <button
              type="button"
              onClick={ this.btnCLick }
            >
              Adicionar despesa
            </button>
          </form>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  inputFormChange: (state) => dispatch(fetchApiExpensesAction(state)),
});

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  loading: wallet.loading,
  error: wallet.error,
  loadFormEdit: wallet.loadFormEdit,
});

FormExpenses.propTypes = {
  inputFormChange: propTypes.func,
  error: propTypes.string,
  loading: propTypes.bool,
  loadFormEdit: propTypes.bool,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(FormExpenses);
