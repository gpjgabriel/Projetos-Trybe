import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { deleteExpense, fnLoadFormEdit } from '../actions';

class TableExpenses extends React.Component {
  btnDeleteClick = ({ target: { id } }) => {
    const { expenses, delExpense } = this.props;
    const filterIds = expenses.filter((filterId) => filterId.id !== Number(id));
    delExpense(filterIds);
  }

  btnEditClick = ({ target: { id } }) => {
    const { loadFormEdit } = this.props;
    loadFormEdit(id);
  }

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expenseKey) => {
            const {
              id, description, tag, method, value, exchangeRates, currency } = expenseKey;
            return (
              <tr key={ id }>
                <td>{ description }</td>
                <td>{ tag }</td>
                <td>{ method }</td>
                <td>{ Number(value).toFixed(2) }</td>
                <td>{ exchangeRates[currency].name.replace('/Real Brasileiro', '')}</td>
                <td>
                  { Number(exchangeRates[currency].ask).toFixed(2) }
                </td>
                <td>
                  { (value * (Number(exchangeRates[currency].ask))).toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <button
                    id={ expenseKey.id }
                    type="button"
                    data-testid="edit-btn"
                    onClick={ this.btnEditClick }
                  >
                    Editar
                  </button>
                  <button
                    id={ expenseKey.id }
                    type="button"
                    data-testid="delete-btn"
                    onClick={ this.btnDeleteClick }
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  delExpense: (expense) => dispatch(deleteExpense(expense)),
  loadFormEdit: (expense) => dispatch(fnLoadFormEdit(expense)),
});

TableExpenses.propTypes = {
  expenses: propTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(TableExpenses);
