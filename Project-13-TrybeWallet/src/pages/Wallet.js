import React from 'react';
import FormExpenses from '../component/formExpenses';
import Header from '../component/Header';
import TableExpenses from '../component/tableExpenses';

class Wallet extends React.Component {
  render() {
    return (
      <main>
        <Header />
        <FormExpenses />
        <TableExpenses />
      </main>
    );
  }
}

export default Wallet;
