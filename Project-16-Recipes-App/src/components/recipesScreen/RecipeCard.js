import React from 'react';
import PropTypes from 'prop-types';

const RecipeCard = ({
  recipeImage,
  recipeName,
  dataTestIdRecipeCard,
  dataTestIdRecipeImg,
  dataTestIdRecipeName,
}) => (
  <div className="recipe-card" data-testid={ dataTestIdRecipeCard }>
    <div className="recipe-card-div-img">
      <img
        src={ recipeImage }
        alt={ recipeName }
        data-testid={ dataTestIdRecipeImg }
        className="recipe-logo"
      />
    </div>
    <div className="logo">
      <span data-testid={ dataTestIdRecipeName }>{ recipeName }</span>
    </div>
  </div>
);

RecipeCard.propTypes = {
  recipeImage: PropTypes.string,
  recipeName: PropTypes.string,
  dataTestIdRecipeCard: PropTypes.string,
  dataTestIdRecipeImg: PropTypes.string,
  dataTestIdRecipeName: PropTypes.string,
};

RecipeCard.defaultProps = {
  recipeName: '',
  recipeImage: '',
  dataTestIdRecipeCard: '',
  dataTestIdRecipeImg: '',
  dataTestIdRecipeName: '',
};

export default RecipeCard;
