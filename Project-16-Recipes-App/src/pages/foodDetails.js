import React, { useContext, useEffect } from 'react';
import propTypes from 'prop-types';
import RecipeDetails from '../components/recipesDetails/recipeDetails';
import Context from '../context/Context';
import fetchRecipesAPI from '../services/fetchRecipesAPI';
import RecomentationRecipe from '../components/recipesDetails/recomendationRecipe';
import StartContinueFinishButton from '../services/startContinueFinishButton';

const INITIAL_STORAGE_PROGRESS = {
  meals: {},
  cocktails: {},
};

function FoodDetails({ match: { params } }) {
  const foodIdDetails = params.idRecipe;
  const {
    foodDetails,
    setfoodDetails,
    allFoodRecipes,
    setAllFoodRecipes,
  } = useContext(Context);

  useEffect(() => {
    fetchRecipesAPI(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodIdDetails}`)
      .then((data) => setfoodDetails(data));
    const returnStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (returnStorage === null) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(INITIAL_STORAGE_PROGRESS));
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
  }, []);

  const { meals } = foodDetails;
  const urlDrinkRecipes = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const recipeType = 'food';

  return (
    <div>
      {meals && meals.map((food) => (
        <RecipeDetails key={ food.idMeal } recipe={ food } />
      )) }
      <RecomentationRecipe
        urlRecipesApi={ urlDrinkRecipes }
        stateContext={ allFoodRecipes }
        setStateContext={ setAllFoodRecipes }
      />
      {meals && StartContinueFinishButton(meals, recipeType)}
    </div>
  );
}

FoodDetails.propTypes = {
  slug: propTypes.string,
}.isRequired;

export default FoodDetails;
