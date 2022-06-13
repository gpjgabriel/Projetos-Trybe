import React from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import RecipeDetailsContext from './recipeDetailsContext';
import ContextRecipesScreen from './ContextRecipesScreen/ContextRecipesScreen';
import ContextLogin from './ContextLogin/ContextLogin';
import ContextProfile from './ContextProfile/ContextProfile';

const ContextProvider = ({ children }) => {
  const { contextRecipesObj } = ContextRecipesScreen();
  const { contextLoginObj } = ContextLogin();
  const { contextProfileObj } = ContextProfile();
  const { recipeDetailsContext } = RecipeDetailsContext();

  const context = {
    ...contextRecipesObj,
    ...contextLoginObj,
    ...contextProfileObj,
    ...recipeDetailsContext,
  };
  return (
    <Context.Provider value={ context }>
      { children }
    </Context.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.element,
};

ContextProvider.defaultProps = {
  children: <>default</>,
};

export default ContextProvider;
