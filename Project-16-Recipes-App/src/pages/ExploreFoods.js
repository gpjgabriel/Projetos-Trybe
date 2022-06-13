import React from 'react';
import { useHistory } from 'react-router-dom';
import BottomMenu from '../components/BottomMenu';
import Header from '../components/Header';
import { fetchRandonFood } from '../services/fetchRandomRecipe';

function ExploreFoods() {
  const history = useHistory();

  const getRecipe = async () => {
    const response = await fetchRandonFood();
    history.push(`/foods/${response[0].idMeal}`);
  };

  return (
    <div>
      <Header />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => {
          history.push('/explore/foods/ingredients');
        } }
      >
        By Ingredient

      </button>
      <button
        type="button"
        data-testid="explore-by-nationality"
        onClick={ () => {
          history.push('/explore/foods/nationalities');
        } }
      >
        By Nationality

      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => getRecipe() }
      >
        Surprise me!
      </button>
      <BottomMenu />
    </div>
  );
}

export default ExploreFoods;
