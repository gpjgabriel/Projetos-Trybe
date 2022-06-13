import React, { useState } from 'react';
import Card from '../components/DoneRecipes/Card';

const recipes = [
  {
    id: '52771',
    type: 'food',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image:
      'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

function DoneRecipes() {
  const [pressedBtn, setBtnPressed] = useState('all');
  return (
    <div>
      <header>Receitas feitas</header>
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
        {pressedBtn === 'all' ? recipes.map((recipe, index) => (
          <Card
            id={ recipe.id }
            category={ recipe.category }
            name={ recipe.name }
            image={ recipe.image }
            doneDate={ recipe.doneDate }
            tags={ recipe.tags }
            key={ recipe.id }
            index={ index }
            type={ recipe.type }
            nationality={ recipe.nationality }
            alcoholicOrNot={ recipe.alcoholicOrNot }
          />
        )) : recipes.filter((recipe) => recipe.type === pressedBtn)
          .map((recipe, index) => (
            <Card
              id={ recipe.id }
              category={ recipe.category }
              name={ recipe.name }
              image={ recipe.image }
              doneDate={ recipe.doneDate }
              tags={ recipe.tags }
              key={ recipe.id }
              index={ index }
              type={ recipe.type }
              alcoholicOrNot={ recipe.alcoholicOrNot }
              nationality={ recipe.nationality }
            />
          ))}
      </ul>
    </div>
  );
}

export default DoneRecipes;
