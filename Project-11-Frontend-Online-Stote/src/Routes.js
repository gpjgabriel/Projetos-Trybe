import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import FinalizePurchase from './pages/FinalizePurchase';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/cart" component={ Cart } />
        <Route path="/productdetails/:id" component={ ProductDetails } />
        <Route path="/finalizepurchase" component={ FinalizePurchase } />
      </Switch>
    );
  }
}

export default Routes;
