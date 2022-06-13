import React from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import IngredientOrganization from '../../services/ingredientOrganization';

function StartRecipeButton({ recipe, recipeType }) {
  const history = useHistory();
  const ingredientList = IngredientOrganization(recipe[0]);

  const redirectRecipeProgress = () => {
    const returnStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (recipeType === 'food') {
      const foodStorage = { ...returnStorage,
        meals: { [recipe[0].idMeal]: ingredientList } };
      console.log(foodStorage);
      localStorage.setItem('inProgressRecipes', JSON.stringify(foodStorage));
      const idRecipeFood = recipe[0].idMeal;
      history.push(`/foods/${idRecipeFood}/in-progress`);
    } else {
      const drinkStorage = { ...returnStorage,
        cocktails: { [recipe[0].idDrink]: ingredientList } };
      console.log(drinkStorage);
      localStorage.setItem('inProgressRecipes', JSON.stringify(drinkStorage));
      const idRecipeDrink = recipe[0].idDrink;
      history.push(`/drinks/${idRecipeDrink}/in-progress`);
    }
  };

  return (
    <button
      type="button"
      data-testid="start-recipe-btn"
      style={ { position: 'fixed', bottom: 0 } }
      onClick={ () => redirectRecipeProgress() }
    >
      Iniciar Receita
    </button>
  );
}

StartRecipeButton.propTypes = {
  recipe: propTypes.string,
  recipeType: propTypes.string,
}.isRequired;

export default StartRecipeButton;
