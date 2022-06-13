import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      currencies: ['BRL'],
    };
  }

  getTotalField = () => {
    const { getExpenses } = this.props;
    let updateFiled = 0;
    getExpenses.forEach((field) => {
      const currencyFilter = field.currency;
      const totalField = Number(field.value)
        * Number(field.exchangeRates[currencyFilter].ask);
      updateFiled += totalField;
    });
    return updateFiled.toFixed(2);
  }

  render() {
    const { currencies } = this.state;
    const { getEmail } = this.props;
    return (
      <header>
        <h3 data-testid="email-field">
          {`Email: ${getEmail}`}
        </h3>
        <h3 data-testid="total-field">
          {`Despesa Total: R$ ${this.getTotalField()}`}
        </h3>
        <h3 data-testid="header-currency-field">
          {currencies[0]}
        </h3>
      </header>
    );
  }
}

Header.propTypes = {
  user: propTypes.string,
}.isRequired;

const mapStateToProps = ({ user, wallet }) => ({
  getEmail: user.email,
  getExpenses: wallet.expenses,
});

export default connect(mapStateToProps)(Header);
