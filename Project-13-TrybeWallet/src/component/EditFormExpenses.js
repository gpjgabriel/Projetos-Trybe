import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { fnEditExpense } from '../actions';

class EditFormExpenses extends React.Component {
  constructor(props) {
    super(props);

    const { expenses, idExpenseEdit } = props;

    const dataExpenseEdit = expenses.filter(
      (expenseEdit) => expenseEdit.id === Number(idExpenseEdit),
    );

    const {
      value, currency, method, tag, description } = dataExpenseEdit[idExpenseEdit];

    this.state = {
      value,
      currency,
      method,
      tag,
      description,
    };
  }

  inputChange = ({ target }) => {
    this.setState({
      [target.id]: target.value,
    });
  }

  btnEditCLick = () => {
    const { expenses, idExpenseEdit, inputEditChange } = this.props;
    const {
      value,
      currency,
      method,
      tag,
      description,
    } = this.state;
    const includeEditToExpenses = expenses.map((expenseEdit) => {
      if (expenseEdit.id === Number(idExpenseEdit)) {
        // console.log(expenseEdit);
        expenseEdit.value = value;
        expenseEdit.currency = currency;
        expenseEdit.method = method;
        expenseEdit.tag = tag;
        expenseEdit.description = description;
      }
      return expenseEdit;
    });
    // console.log(includeEditToExpenses);
    inputEditChange(includeEditToExpenses);
  }

  render() {
    const {
      value,
      currency,
      method,
      tag,
      description,
    } = this.state;

    const { currencies } = this.props;

    return (
      <div>
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
            onClick={ this.btnEditCLick }
          >
            Editar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  inputEditChange: (state) => dispatch(fnEditExpense(state)),
});

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  expenses: wallet.expenses,
  idExpenseEdit: wallet.idExpenseEdit,
});

EditFormExpenses.propTypes = {
  inputFormChange: propTypes.func,
  idExpenseEdit: propTypes.number,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(EditFormExpenses);
