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

function DrinkDetails({ match: { params } }) {
  const drinkIdDetails = params.idRecipe;
  const {
    drinkDetails,
    setDrinkDetails,
    allDrinkRecipes,
    setAllDrinkRecipes,
  } = useContext(Context);

  useEffect(() => {
    fetchRecipesAPI(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkIdDetails}`)
      .then((data) => setDrinkDetails(data));
    const returnStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (returnStorage === null) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(INITIAL_STORAGE_PROGRESS));
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
  }, []);

  const { drinks } = drinkDetails;
  const urlFoodRecipes = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const recipeType = 'drink';

  return (
    <div>
      {drinks && drinks.map((drink) => (
        <RecipeDetails key={ drink.idDrink } recipe={ drink } />
      )) }
      <RecomentationRecipe
        urlRecipesApi={ urlFoodRecipes }
        stateContext={ allDrinkRecipes }
        setStateContext={ setAllDrinkRecipes }
      />
      {drinks && StartContinueFinishButton(drinks, recipeType)}
    </div>
  );
}

DrinkDetails.propTypes = {
  slug: propTypes.string,
}.isRequired;

export default DrinkDetails;
