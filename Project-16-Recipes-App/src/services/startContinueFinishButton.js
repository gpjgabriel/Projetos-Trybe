import React from 'react';
import StartRecipeButton from '../components/recipesDetails/startRecipeButton';
import ContinueRecipeButton from '../components/recipesDetails/continueRecipeButton';

const StartContinueFinishButton = (recipe, recipeType) => {
  const [recipeDesctructuring] = [...recipe];
  const { idMeal } = recipeDesctructuring;
  const { idDrink } = recipeDesctructuring;
  const idRecipe = idMeal || idDrink;
  const returnStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const idFoodInProgress = Object.keys(returnStorage.meals);
  const searchFoodId = idFoodInProgress.some((id) => idRecipe === id);
  const idDrinkInProgress = Object.keys(returnStorage.cocktails);
  const searchDrinkId = idDrinkInProgress.some((id) => idRecipe === id);
  if (searchFoodId || searchDrinkId) {
    console.log('entrou aqui!!');
    return (<ContinueRecipeButton />);
  }
  console.log('entrou aqui !!!');
  return (<StartRecipeButton recipe={ recipe } recipeType={ recipeType } />);
};

export default StartContinueFinishButton;
