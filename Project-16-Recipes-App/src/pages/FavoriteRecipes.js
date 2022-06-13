import React, { useState } from 'react';
import Card from '../components/FavoriteRecipes/Card';

function FavoriteRecipes() {
  const [pressedBtn, setBtnPressed] = useState('all');
  const getRecipes = JSON.parse(localStorage.getItem('setFavoritesRecipes'));
  return (
    <div>
      <header>Receitas Favoritas</header>
      <button
        data-testid="filter-by-all-btn"
        type="button"
        onClick={ () => setBtnPressed('all') }
      >
        All
      </button>
      <button
        data-testid="filter-by-food-btn"
        type="button"
        onClick={ () => setBtnPressed('food') }
      >
        Food
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
        onClick={ () => setBtnPressed('drink') }
      >
        Drinks
      </button>
      <ul>
        {pressedBtn === 'all' ? getRecipes.map((recipe, index) => (

          <Card
            id={ recipe.id }
            type={ recipe.type }
            nationality={ recipe.nationality }
            category={ recipe.category }
            alcoholicOrNot={ recipe.alcoholicOrNot }
            name={ recipe.name }
            image={ recipe.image }
            key={ recipe.id }
            index={ index }
          />
        )) : getRecipes.filter((recipe) => recipe.type === pressedBtn)
          .map((recipe, index) => (
            <Card
              type={ recipe.type }
              nationality={ recipe.nationality }
              category={ recipe.category }
              alcoholicOrNot={ recipe.alcoholicOrNot }
              name={ recipe.name }
              image={ recipe.image }
              key={ recipe.id }
              index={ index }
              id={ recipe.id }
            />
          ))}
      </ul>
    </div>
  );
}

export default FavoriteRecipes;
