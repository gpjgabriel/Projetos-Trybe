import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';

const renderWithRouter = (renderComponent) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{renderComponent}</Router>), history,
  });
};
export default renderWithRouter;
