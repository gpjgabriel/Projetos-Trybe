import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { Carousel } from 'react-bootstrap';
import fetchRecipesAPI from '../../services/fetchRecipesAPI';
import RecipeCard from './recipeCard';

const NUMBER_FIVE = 5;

function RecomentationRecipe({ urlRecipesApi, stateContext, setStateContext }) {
  useEffect(() => {
    fetchRecipesAPI(urlRecipesApi)
      .then((data) => setStateContext(data));
  }, []);

  const { drinks } = stateContext;
  const { meals } = stateContext;

  const arrFilter = (drinks || meals) && (drinks || meals)
    .filter((_recipe, index) => index <= NUMBER_FIVE);

  return (
    <Carousel variant="dark">
      {arrFilter && arrFilter.map((recipe_, i, arr) => (
        <Carousel.Item key={ arr[i].idDrink || arr[i].idMeal }>
          <RecipeCard
            title={ arr[i].strDrink || arr[i].strMeal }
            image={ arr[i].strDrinkThumb || arr[i].strMealThumb }
            category={ arr[i].strAlcoholic || arr[i].strCategory }
            testid={ `${[i]}-recomendation-card` }
          />
          {/* <RecipeCard
            title={ (arr[(arr.length - 1) - i]).strDrink || (
              arr[(arr.length - 1) - i]).strMeal }
            image={ (arr[(arr.length - 1) - i]).strDrinkThumb || (
              arr[(arr.length - 1) - i]).strMealThumb }
            category={ (arr[(arr.length - 1) - i]).strAlcoholic || (
              arr[(arr.length - 1) - i]).strCategory }
            testid={ `${(arr.length - 1) - i}-recomendation-card` }
          /> */}
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

RecomentationRecipe.propTypes = {
  urlRecipesApi: propTypes.string,
}.isRequired;

export default RecomentationRecipe;
