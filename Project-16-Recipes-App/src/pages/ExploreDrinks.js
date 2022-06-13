import React from 'react';
import { useHistory } from 'react-router-dom';
import BottomMenu from '../components/BottomMenu';
import Header from '../components/Header';
import { fetchRandonDrink } from '../services/fetchRandomRecipe';

function ExploreDrinks() {
  const history = useHistory();

  const getRecipe = async () => {
    const response = await fetchRandonDrink();
    history.push(`/drinks/${response[0].idDrink}`);
  };

  return (
    <div>
      <Header />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => {
          history.push('/explore/drinks/ingredients');
        } }
      >
        By Ingredient
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

export default ExploreDrinks;
