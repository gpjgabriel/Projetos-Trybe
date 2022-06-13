import React from 'react';
import propTypes from 'prop-types';
import IngredientOrganization from '../../services/ingredientOrganization';

function IngredientList({ recipe }) {
  const arrIngredient = IngredientOrganization(recipe);

  return (
    <section>
      <h4>Ingredientes</h4>
      <ul>
        {arrIngredient.map((item, index) => (
          <li
            key={ item.ingredient }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            { `${item.ingredient} - ${item.measure}` }
          </li>
        ))}
      </ul>
    </section>
  );
}

IngredientList.propTypes = {
  recipe: propTypes.objectOf(propTypes.string),
}.isRequired;

export default IngredientList;
